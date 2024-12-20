import express from 'express';

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const getDepartmentsQuery = `SELECT * FROM DEPARTMENTS`;

    try {
        const result = await PG_CLIENT.query(getDepartmentsQuery);

         res.status(200).json({
            status: 'success',
            rows: result.rows,
        });
    } catch (error) {
         res.status(500).json({
            status: 'error',
            error: error.message,
        })
    }
})

export default router;