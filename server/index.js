import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// local imports
import EstablishPGConnection from "./config/configDb.js";
import SetupDBTables from "./database/createTables.js";

// Routes
import adminCreateRouter from "./routes/create-admin.js";
import adminLoginRouter from "./routes/admin-login.js";
import uploadRouter from "./routes/upload-data.js";
import getDepartments from "./routes/get-departments.js";
import planExamRouter from "./routes/plan-exam.js";
import studentDetailsRouter from "./routes/get-student-details.js";
import getExaminationsRouter from "./routes/get-examinations.js";
import editExamPlanRouter from "./routes/edit-exam-plan.js";
import cancelExamPlanRouter from "./routes/cancel-exam.js";
import deleteDepartmentRouter from "./routes/delete-department.js";
import getInvigilatorDetailsRouter from "./routes/get-invigilator-details.js";
import editDataRouter from "./routes/edit-data.js";

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
}));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://example.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
}); // Pre-flight requests

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Base route
app.get('/', (req, res) => {
    res.send('Hello World!!');
})

// All routes
app.use('/create-admin', adminCreateRouter);
app.use('/admin-login', adminLoginRouter);
app.use('/upload-data', uploadRouter);
app.use('/edit-dept', editDataRouter);
app.use('/get-departments', getDepartments);
app.use('/plan-exam', planExamRouter);
app.use('/student-exam', studentDetailsRouter);
app.use('/get-examinations', getExaminationsRouter);
app.use('/edit-exam', editExamPlanRouter);
app.use('/cancel-exam', cancelExamPlanRouter);
app.use('/delete-department', deleteDepartmentRouter);
app.use('/invigilator-schedule', getInvigilatorDetailsRouter);

// Listen at environment specific port or at 8081
const port = process.env.APP_PORT || 8081;

const serverStart = () => {
    app.listen(port, () => {
        console.log(`Server started at ${port}`);
    })
}

// Establish the connection then only start server
EstablishPGConnection(serverStart).then(() => {
    /* Now setup DB with tables */
    SetupDBTables();
});