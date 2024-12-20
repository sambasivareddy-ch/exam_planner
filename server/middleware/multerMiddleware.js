import multer from 'multer';
import fs from 'fs';
import path from 'path';
import csvParser from "csv-parser";

import __dirname from "../dirname.js";

const upload = multer({
    dest: './uploads/',
});

export const csvSingleFileUpload = upload.single("file");

export const formDataFieldsUpload = upload.fields([
    { name: 'deptStaffFile', maxCount: 1 },
    { name: 'deptStudentFile', maxCount: 1 },
    { name: 'deptRoomsFile', maxCount: 1 },
]);

export const editDataFieldsUpload = upload.fields([
    { name: 'deptStaffFile', maxCount: 1 },
    { name: 'deptStudentFile', maxCount: 1 }
]);

export const parseSingleCSVFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).join({
            status: 'error',
            message: 'File is required',
        })
    }

    const filePath = req.file.path;
    const rows = []

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', data => rows.push(data))
        .on('end', () => {
            req.rows = rows;
            next();
        })
        .on('error', err => {
            res.status(500).json({
                status: 'error',
                message: err.message,
            })
        })
        .on('finish', () => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.status(500).json({
                        status: 'error',
                        message: err.message,
                    })
                }
            })
            next();
        });
}

export const parseMultipleCSVFile = async (req, res, next) => {
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Files are required',
        })
    }

    const results = {};

    try {
        await Promise.all(
            Object.keys(files).map(async (file) => {
                const filePath = path.join(__dirname, files[file][0].path);
                const rows = [];

                await new Promise((resolve, reject) => {
                    fs.createReadStream(filePath)
                        .pipe(csvParser())
                        .on('data', data => rows.push(data))
                        .on('end', () => {
                            results[files[file][0].fieldname] = rows;
                            resolve();
                        })
                        .on('error', err => {
                            reject(err);
                        });
                });

                fs.unlinkSync(filePath);
            })
        )

        req.results = results;
        next();
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        })
    }
}