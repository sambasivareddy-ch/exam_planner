import express from 'express';
import format from "pg-format";

import { parseMultipleCSVFile, formDataFieldsUpload } from "../middleware/multerMiddleware.js";
import convertArrayOfObjectsToArrayOfArrays from "../helpers/convertArrayOfObjectToArrayofArrays.js";

import {PG_CLIENT} from "../config/configDb.js";
import executeInsertQuery from "../database/insertQuery.js";

const router = express.Router();

router.post('/',
    formDataFieldsUpload,
    parseMultipleCSVFile,
    async (req, res) => {

    const { department } = req.body;
    const studentRows = req.results?.deptStudentFile;
    const staffRows = req.results?.deptStaffFile;
    const deptRooms = req.results?.deptRoomsFile;

    // get the last department id to insert staffs & students
    try {
        const insertIntoDepts = `INSERT INTO departments (dept_name) VALUES ($1) RETURNING dept_id`;

        const queryResponse = await PG_CLIENT.query(insertIntoDepts, [department]);
        const latestDeptId = queryResponse.rows[0]['dept_id'];

        const updatedStudentRows = convertArrayOfObjectsToArrayOfArrays(studentRows, latestDeptId);
        const updatedStaffRows = convertArrayOfObjectsToArrayOfArrays(staffRows, latestDeptId);
        const updatedRoomRows = convertArrayOfObjectsToArrayOfArrays(deptRooms, latestDeptId);

        const studentInsertQuery = format("INSERT INTO STUDENTS (stud_name, roll_no, dept_id) VALUES %L", updatedStudentRows);
        const countOfInsertedStudentRows = executeInsertQuery(studentInsertQuery);

        const invigilatorsInsertQuery = format("INSERT INTO invigilators (invg_email, invg_name, invg_dept_id) VALUES %L", updatedStaffRows);
        const countOfInsertedInvgRows = executeInsertQuery(invigilatorsInsertQuery);

        const deptRoomsInsertQuery = format("INSERT INTO examination_rooms (room_name, dept_id) VALUES %L", updatedRoomRows);
        const countOfInsertedRoomRows = executeInsertQuery(deptRoomsInsertQuery);

        return res.status(200).json({
            status: 'success',
            studentRowsCount: countOfInsertedStudentRows,
            staffRowsCount: countOfInsertedInvgRows,
            deptClassesCount: countOfInsertedRoomRows,
        })

    } catch (err) {
        return res.status(500).send(err.message);
    }
})

export default router;