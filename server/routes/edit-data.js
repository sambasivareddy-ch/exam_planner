import express from 'express';

import { PG_CLIENT } from "../config/configDb.js";
import { editDataFieldsUpload, parseMultipleCSVFile } from "../middleware/multerMiddleware.js";
import convertArrayOfObjectsToArrayOfArrays from "../helpers/convertArrayOfObjectToArrayofArrays.js";
import format from "pg-format";
import executeInsertQuery from "../database/insertQuery.js";

const router = express.Router();

router.post('/', editDataFieldsUpload, parseMultipleCSVFile, async (req, res) => {
    const { dept_id } = req.body;

    console.log(dept_id);

    const studentRows = req.results?.deptStudentFile;
    const staffRows = req.results?.deptStaffFile;

    try {
        let countOfInsertedStudentRows,countOfInsertedInvgRows;

        if (studentRows && studentRows.length > 0) {
            const updatedStudentRows = convertArrayOfObjectsToArrayOfArrays(studentRows, dept_id);
            await PG_CLIENT.query('DELETE FROM STUDENTS WHERE dept_id = $1', [dept_id]);
            const studentInsertQuery = format("INSERT INTO STUDENTS (stud_name, roll_no, dept_id) VALUES %L", updatedStudentRows);
            countOfInsertedStudentRows = executeInsertQuery(studentInsertQuery);
        }

        if (staffRows && staffRows.length > 0) {
            const updatedStaffRows = convertArrayOfObjectsToArrayOfArrays(staffRows, dept_id);
            await PG_CLIENT.query('DELETE FROM invigilators WHERE invg_dept_id = $1', [dept_id]);
            const invigilatorsInsertQuery = format("INSERT INTO invigilators (invg_email, invg_name, invg_dept_id) VALUES %L", updatedStaffRows);
            countOfInsertedInvgRows = executeInsertQuery(invigilatorsInsertQuery);
        }

        res.status(200).json({
            success: true,
            updated: 1,
            message: 'Successfully updated department',
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
})

export default router;