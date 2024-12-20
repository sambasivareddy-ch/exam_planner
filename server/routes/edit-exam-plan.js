import express from "express";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

router.put("/",  async (req, res) => {
    const { exam_plan_id, exam_name, exam_date } = req.body;

    const updateExamQuery = `UPDATE exam_plan SET exam_name = $1, exam_date = $2 WHERE exam_plan_id = $3;`

    try {
        const updatedRowCount = (await PG_CLIENT.query(updateExamQuery, [exam_name, exam_date, exam_plan_id])).rowCount;

        res.status(200).json({
            success: true,
            updated: updatedRowCount,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

export default router;