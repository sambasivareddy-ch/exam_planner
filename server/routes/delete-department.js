import express from "express";
import format from "pg-format";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

router.delete("/", async (req, res) => {
    const { dept_id } = req.body;

    const DEPARTMENT_DELETE_QUERY = `DELETE FROM departments WHERE dept_id=${dept_id}`;
    const STUDENT_DELETE_QUERY = `DELETE FROM students WHERE dept_id=${dept_id}`;
    const STAFF_DELETE_QUERY = `DELETE FROM invigilators WHERE invg_dept_id=${dept_id}`;
    const ROOMS_DELETE_QUERY = `DELETE FROM examination_rooms WHERE dept_id=${dept_id}`;
    const SEATING_ARRANGEMENT_DELETE_PLACEHOLDER = `DELETE FROM seating_arrangements WHERE roll_no in (%L)`
    const SELECT_STUDENTS = `SELECT roll_no FROM students WHERE dept_id=${dept_id}`;

    try {
        const studentRecords = (await PG_CLIENT.query(SELECT_STUDENTS)).rows;

        const student_roll_no = [];
        for (let i = 0; i < studentRecords.length; i++) {
            student_roll_no.push(studentRecords[i].roll_no);
        }

        const SEATING_ARRANGEMENT_DELETE_QUERY = format(SEATING_ARRANGEMENT_DELETE_PLACEHOLDER, student_roll_no);

        const _ = (await PG_CLIENT.query(SEATING_ARRANGEMENT_DELETE_QUERY)).rowCount;
        const noOfStudentsDeleted = (await PG_CLIENT.query(STUDENT_DELETE_QUERY)).rowCount;
        const noOfStaffsDeleted = (await PG_CLIENT.query(STAFF_DELETE_QUERY)).rowCount;
        const noOfRoomsDeleted = (await PG_CLIENT.query(ROOMS_DELETE_QUERY)).rowCount;
        const noOfDeptsDeleted = (await PG_CLIENT.query(DEPARTMENT_DELETE_QUERY)).rowCount;

        res.status(200).json({
            success: true,
            data: {
                no_of_departments_deleted: noOfDeptsDeleted,
                no_of_students_deleted: noOfStudentsDeleted,
                no_of_rooms_deleted: noOfRoomsDeleted,
                no_of_staffs_deleted: noOfStaffsDeleted,
            },
            updated: noOfDeptsDeleted,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
})

export default router;