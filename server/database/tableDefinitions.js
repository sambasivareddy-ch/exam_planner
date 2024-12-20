export const DEPARTMENT_TABLE =
    `
        CREATE TABLE IF NOT EXISTS DEPARTMENTS 
        (
            DEPT_ID BIGSERIAL, 
            DEPT_NAME VARCHAR(25),
            PRIMARY KEY (DEPT_ID, DEPT_NAME)
        );
    `

export const STUDENTS_TABLE =
    `
        CREATE TABLE IF NOT EXISTS STUDENTS
        (
            STUD_ID BIGSERIAL, 
            STUD_NAME VARCHAR(40) NOT NULL, 
            ROLL_NO VARCHAR(15) NOT NULL, 
            DEPT_ID INTEGER,
            PRIMARY KEY(ROLL_NO),
            CONSTRAINT fk_department FOREIGN KEY (DEPT_ID)
                REFERENCES DEPARTMENTS(DEPT_ID)
        );
    `

export const ADMIN_TABLE =
    `
        CREATE TABLE IF NOT EXISTS ADMINS 
        (
            ADMIN_ID BIGSERIAL,
            ADMIN_EMAIL TEXT NOT NULL,
            ADMIN_PASSWORD TEXT NOT NULL,
            SESSION VARCHAR(40),
            PRIMARY KEY(ADMIN_ID, ADMIN_EMAIL)
        )
    `

export const INVIGILATORS_TABLE =
    `
        CREATE TABLE IF NOT EXISTS INVIGILATORS
        (
            INVG_ID BIGSERIAL,
            INVG_EMAIL VARCHAR(40) NOT NULL,
            INVG_NAME VARCHAR(40) NOT NULL,
            INVG_DEPT_ID INTEGER,
            PRIMARY KEY(INVG_ID, INVG_EMAIL),
            CONSTRAINT fk_department FOREIGN KEY (INVG_DEPT_ID)
                REFERENCES DEPARTMENTS(DEPT_ID)
        )
    `

export const EXAM_PLAN_TABLE =
    `
        CREATE TABLE IF NOT EXISTS EXAM_PLAN
        (
            EXAM_PLAN_ID BIGSERIAL,
            EXAM_NAME VARCHAR(40),
            EXAM_DATE DATE NOT NULL,
            PRIMARY KEY(EXAM_PLAN_ID, EXAM_DATE)
        )
    `

export const SEATING_ARRANGEMENTS_TABLE =
    `
        CREATE TABLE IF NOT EXISTS SEATING_ARRANGEMENTS 
        (
            SEATING_ID BIGSERIAL,
            EXAM_ID INTEGER,
            ROOM_NO VARCHAR(15),
            ROLL_NO VARCHAR(15),
            BENCH_NO VARCHAR(15),
            PRIMARY KEY (SEATING_ID, ROLL_NO),
            CONSTRAINT fk_exam FOREIGN KEY (EXAM_ID)
                REFERENCES EXAM_PLAN(EXAM_PLAN_ID),
            CONSTRAINT fk_roll_no FOREIGN KEY (ROLL_NO)
                REFERENCES STUDENTS(ROLL_NO)
        )
    `

export const EXAMINATION_ROOMS =
    `
        CREATE TABLE IF NOT EXISTS EXAMINATION_ROOMS
        (
            DEPT_ID INTEGER,
            ROOM_NAME VARCHAR(40) PRIMARY KEY,
            CONSTRAINT fk_department FOREIGN KEY (DEPT_ID)
                REFERENCES DEPARTMENTS(DEPT_ID)
        )
    `

export const INVIGILATORS_ARRANGEMENT =
    `
        CREATE TABLE IF NOT EXISTS INVIGILATORS_ARRANGEMENTS
        (
            ID BIGSERIAL PRIMARY KEY,
            INVG_EMAIL VARCHAR(40),
            EXAM_PLAN_ID INTEGER,
            ROOM_NAME VARCHAR(40),
            EXAM_DATE DATE NOT NULL
        )
    `