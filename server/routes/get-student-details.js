import express from "express";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

const SELECT_QUERY = `
    SELECT e.exam_name, e.exam_date, s.room_no, s.bench_no 
    FROM 
        seating_arrangements s 
    JOIN 
        exam_plan e 
    ON e.exam_plan_id = s.exam_id WHERE s.roll_no = $1
`

router.get("/:id", async (req, res) => {
    const studentRollNumber = req.params.id;

    try {
        const rows = (await PG_CLIENT.query(SELECT_QUERY, [studentRollNumber])).rows;

        res.status(200).json({
            success: true,
            result: rows,
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            success: false,
        });
    }
})

export default router;