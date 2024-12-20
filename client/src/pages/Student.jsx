import React, {useRef, useState} from "react";

import { InputComponentWithRef } from "../components/InputComponent";
import SubmitButton from "../components/SubmitButton";
import { StudentExamDetailsTable } from "../components/ExamDetailsTable";

import styles from "../styles/student.module.css";

const Student = () => {
    const classes = `flex-container-center ${styles["student-container"]}`
    const form_classes = `flex-container-col ${styles["student-form"]}`;

    const student_rollRef = useRef("");
    const [studentDetails, setStudentDetails] = useState();

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const student_roll_number = student_rollRef.current.value;

        try {
            const response = await fetch(`http://localhost:8080/student-exam/${student_roll_number}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json();

            if (data.success) {
                setStudentDetails(data.result);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className={classes}>
            <form className={form_classes} onSubmit={formSubmitHandler}>
                <h2>Get your seating arrangement</h2>
                <InputComponentWithRef
                    name={"student_roll_no"}
                    type={"text"}
                    ref={student_rollRef}
                    placeholder={"Enter your roll number"}
                />
                <SubmitButton text={"Submit"}/>
            </form>
            <div className={styles["student-exam__details"]}>
                {studentDetails && <StudentExamDetailsTable data={studentDetails}/>}
            </div>
        </div>
    )
}

export default Student;