import express from "express";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

router.delete('/', async (req, res) => {
    const { exam_id } = req.body;
    console.log(exam_id);
    const seatingArrangementDeleteQuery = "DELETE FROM seating_arrangements WHERE exam_id = $1";
    const examPlanDeleteQuery = "DELETE FROM exam_plan WHERE exam_plan_id = $1";

    try {
        await PG_CLIENT.query(seatingArrangementDeleteQuery, [exam_id]);
        const deletedRows = (await PG_CLIENT.query(examPlanDeleteQuery, [exam_id])).rowCount;

        res.status(200).json({
            success: true,
            updated: deletedRows,
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        })
    }
})

export default router;