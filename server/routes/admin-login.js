import express from 'express';
import bcrypt from "bcryptjs";

import {PG_CLIENT} from "../config/configDb.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = `SELECT admin_password FROM admins WHERE admin_email = $1`;
        const row = await PG_CLIENT.query(query, [email]);

        const encrypted_password = row.rows[0].admin_password;

        await bcrypt.compare(password, encrypted_password)
            .then((result) => {
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "Successfully LoggedIn"
                    })
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Not logged in"
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: err.message,
                })
            })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

export default router;