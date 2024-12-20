import express from "express";
import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const examinationsSelectQuery = "SELECT * FROM exam_plan";

    try {
        const rows = (await PG_CLIENT.query(examinationsSelectQuery)).rows;

        res.status(200).json({
            rows: rows,
            success: true,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        })
    }
})

export default router;