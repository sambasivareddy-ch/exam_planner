import express from "express";

import {PG_CLIENT} from "../config/configDb.js";
import format from "pg-format";
import generateExamPlan from "../helpers/generateExamPlan.js";
import generateExamPlanForInvigilators from "../helpers/generateExamPlanForInvigilators.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const {
        exam_name,
        exam_date,
        no_of_rooms,
        no_of_benches_per_room,
        no_of_students_per_bench,
        checkedDeptsForStudents,
        checkedDeptsForRooms,
    } = req.body;

    try {
        // Examination Rooms
        const rooms = [];
        const selectExaminationRooms = format("SELECT room_name FROM examination_rooms e WHERE e.dept_id IN (%L);", checkedDeptsForRooms);
        const selectedRooms = (await PG_CLIENT.query(selectExaminationRooms)).rows;
        selectedRooms.forEach(room => {
            rooms.push(room['room_name']);
        })

        const selectCountStudentsQuery = format("SELECT COUNT(*) FROM students s WHERE s.dept_id IN (%L);", checkedDeptsForStudents);
        const result = await PG_CLIENT.query(selectCountStudentsQuery);
        const noOfStudents = result.rows[0]['count'];

        const selectStaffsQuery = format("SELECT invg_email FROM invigilators WHERE invg_dept_id IN (%L);", checkedDeptsForRooms);
        const selectedInvigilators = (await PG_CLIENT.query(selectStaffsQuery)).rows;

        // Valid the inputs
        if (noOfStudents > 0
            && no_of_rooms * no_of_benches_per_room * no_of_students_per_bench < noOfStudents) {
            res.status(400).json({
                status: "error",
                message: "Not enough benches to allocate all students",
                suggestions: `increase the benches by ${noOfStudents/no_of_students_per_bench} benches`
            })
        }

        if (selectedInvigilators.length > 0 && selectedInvigilators.length < selectedRooms.length) {
            res.status(400).json({
                status: "error",
                message: "Invigilators are not enough to allocate in all classes",
                suggestions: `Rooms selected: ${selectedRooms.length} and invigilators count: ${selectedInvigilators.length}`,
            })
        }

        // Get the eligible students
        const selectQueryToGetStudentsByBranch = format("SELECT roll_no, dept_id FROM students WHERE dept_id IN (%L) ORDER BY dept_id;", checkedDeptsForStudents);
        const selectedStudents = (await PG_CLIENT.query(selectQueryToGetStudentsByBranch)).rows;

        const allocations = generateExamPlan(
            rooms,
            selectedStudents.length,
            no_of_students_per_bench,
            no_of_benches_per_room,
            selectedStudents,
            no_of_rooms);

        const staffAllocations = generateExamPlanForInvigilators(
            rooms,
            selectedInvigilators,
            exam_date
        )

        // Insert into the ExamPlan Table and SeatingArrangement Table
        const insertIntoExamPlanTableQuery = format("INSERT INTO exam_plan(exam_name, exam_date) VALUES (%L) RETURNING exam_plan_id", [exam_name, exam_date]);
        const examPlanId = (await PG_CLIENT.query(insertIntoExamPlanTableQuery)).rows[0]['exam_plan_id'];

        const insertQuery = format(
            "INSERT INTO seating_arrangements (exam_id, room_no, roll_no, bench_no) VALUES %L",
            allocations.map(a => [examPlanId, a.room_no, a.roll_no, a.bench_no])
        );
        await PG_CLIENT.query(insertQuery);

        const insertQueryForStaffAllocations = format(
            "INSERT INTO invigilators_arrangements (invg_email, exam_plan_id, room_name, exam_date) VALUES %L",
            staffAllocations.map(a => [a.staff, examPlanId, a.room, a.date])
        )
        await PG_CLIENT.query(insertQueryForStaffAllocations);

        res.status(200).json({
            status: "success",
            updated: 1,
            message: "Successfully Planned Exam"
        })
    } catch (e) {
        res.status(500).json({
            status: "error",
            message: e.message,
        });
    }
})

export default router;