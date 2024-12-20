import express from "express";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

const SELECT_QUERY = `
    SELECT e.exam_name, e.exam_date, o.room_name
    FROM 
        invigilators_arrangements o
    JOIN 
        exam_plan e 
    ON e.exam_plan_id = o.exam_plan_id WHERE o.invg_email = $1
`

router.get("/:email", async (req, res) => {
    const staffEmailAddress = req.params.email;

    try {
        const rows = (await PG_CLIENT.query(SELECT_QUERY, [staffEmailAddress])).rows;

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