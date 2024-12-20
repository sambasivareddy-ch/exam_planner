import express from "express";
import bcrypt from "bcryptjs";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

/*
 Insert a row into the admin table by encrypting the password.
 */
router.post("/", async (req, res) => {
    const { admin_email, admin_password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(admin_password, 10);

        const query = `INSERT INTO admins(ADMIN_EMAIL, ADMIN_PASSWORD) VALUES ($1, $2)`;
        await PG_CLIENT.query(query, [admin_email, hashedPassword]);

        res.status(200).json({
            success: true,
            message: `Successfully created admin with email: ${admin_email}`,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

export default router;