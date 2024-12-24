import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { InputComponentWithRef } from "../components/InputComponent";
import { CheckBoxWithoutInputShown } from "../components/InputWithLabel";
import SubmitButton from "../components/SubmitButton";
import PlanWrapper from "../components/PlanWrapper";
import Toast from "../components/toasts/Toast";

import useFetchApi from "../hooks/useFetchApi";
import useFetchDept from "../hooks/useFetchDept";

import styles from "../styles/plan.module.css";

const PlanExam = (props) => {
    const { fetchApi, isLoading, errorInfo, successInfo } = useFetchApi();

    const departments = useFetchDept();

    const examName = useRef("");
    const examDate = useRef(null);
    const noOfRooms = useRef(0);
    const noOfBenchesPerRoom = useRef(0);
    const noOfStudentsPerBench = useRef(0);

    const [checkedDepts1, setCheckedDepts1] = useState(new Array(departments.length).fill(false));
    const [checkedDepts2, setCheckedDepts2] = useState(new Array(departments.length).fill(false));


    const submitHandler = async (e) => {
        e.preventDefault();

        const exam_name = examName.current.value;
        const exam_date = examDate.current.value;
        const no_of_rooms = noOfRooms.current.value;
        const no_of_benches_per_room = noOfBenchesPerRoom.current.value;
        const no_of_students_per_bench = noOfStudentsPerBench.current.value;

        const checkedDeptsForStudents = [];
        for (let i = 0; i < checkedDepts1.length; i++) {
            if (checkedDepts1[i]) {
                checkedDeptsForStudents.push(departments[i].dept_id)
            }
        }

        const checkedDeptsForRooms = [];
        for (let i = 0; i < checkedDepts2.length; i++) {
            if (checkedDepts2[i]) {
                checkedDeptsForRooms.push(departments[i].dept_id);
            }
        }

        const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';
        
        await fetchApi(`${serverURL}/plan-exam`, "POST", JSON.stringify({
            exam_name,
            exam_date,
            no_of_rooms,
            no_of_benches_per_room,
            no_of_students_per_bench,
            checkedDeptsForStudents,
            checkedDeptsForRooms,
        }));
    };

    return (
        <PlanWrapper>
            <span>Select departments of the Students:</span>
            <div className={styles["plan-depts_container"]}>
                {departments.map((department, idx) => {
                    return (
                        <CheckBoxWithoutInputShown
                            key={Math.random()}
                            name={`department-${idx}`}
                            value={department['dept_id']}
                            label={department['dept_name']}
                            is_checked={checkedDepts1[idx]}
                            onChange={(e) => {
                                const updatedDepts = [...checkedDepts1];
                                updatedDepts[idx] = !updatedDepts[idx];
                                setCheckedDepts1(updatedDepts);
                            }}
                        />
                    );
                })}
            </div>
            <span>Select department classes:</span>
            <div className={styles["plan-depts_container"]}>
                {departments.map((department, idx) => {
                    return (
                        <CheckBoxWithoutInputShown
                            key={Math.random()}
                            name={`department-room-${idx}`}
                            value={department['dept_id']}
                            label={department['dept_name']}
                            is_checked={checkedDepts2[idx]}
                            onChange={(e) => {
                                const updatedDepts = [...checkedDepts2];
                                updatedDepts[idx] = !updatedDepts[idx];
                                setCheckedDepts2(updatedDepts);
                            }}
                        />
                    );
                })}
            </div>
            <div className={styles["plan-form_container"]}>
                <form
                    className={styles["plan-form"]}
                    onSubmit={submitHandler}
                >
                    <InputComponentWithRef
                        type="text"
                        name="exam-name"
                        placeholder="Enter Exam Name"
                        ref={examName}
                        required={true}
                    />
                    <InputComponentWithRef
                        type="date"
                        name="exam-date"
                        placeholder="Enter Exam Date"
                        ref={examDate}
                        required={true}
                    />
                    <InputComponentWithRef
                        type="number"
                        name="no-of-benches-per-room"
                        placeholder="Number of benches per rooms"
                        ref={noOfBenchesPerRoom}
                        required={true}
                    />
                    <InputComponentWithRef
                        type="number"
                        name="no-of-student-per-benches"
                        placeholder="Number of students per benches"
                        ref={noOfStudentsPerBench}
                        required={true}
                    />
                    <SubmitButton text={"Generate Plan"}/>
                </form>
            </div>
            {isLoading && createPortal(
                <Toast message={"Generating..."} messageType={"info"}/>,
                document.getElementById("modal-root")
            )}
            {errorInfo.isError === true && createPortal(
                <Toast message={`Error: ${errorInfo.message}`} messageType={"error"}/>,
                document.getElementById("modal-root")
            )}
            {successInfo.isSuccess === true && createPortal(
                <Toast message={`Generated ${successInfo.message} plan`} messageType={"success"}/>,
                document.getElementById("modal-root")
            )}
        </PlanWrapper>
    );
};

export default PlanExam;
