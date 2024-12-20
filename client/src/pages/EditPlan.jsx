import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import useFetchExams from "../hooks/useFetchExams";
import useFetchApi from "../hooks/useFetchApi";

import { InputComponentWithState } from "../components/InputComponent";
import SubmitButton from "../components/SubmitButton";
import PlanWrapper from "../components/PlanWrapper";
import Toast from "../components/toasts/Toast";
import InputSelect from "../components/InputSelect";

import styles from "../styles/plan.module.css";

const EditPlan = (props) => {
    const [toBeModified, setToBeModified] = useState({});
    const [selectedExamIdx, setSelectedExamIdx] = useState("");
    const {fetchApi, isLoading, errorInfo, successInfo} = useFetchApi();

    const examinations = useFetchExams();

    const examNameChangeHandler = (e) => {
        setToBeModified(prev => ({ ...prev, exam_name: e.target.value }));
    };

    const examDateChangeHandler = (e) => {
        setToBeModified(prev => ({ ...prev, exam_date: e.target.value }));
    };

    const selectChangeHandler = (e) => {
        setSelectedExamIdx(e.target.value);
        setToBeModified(examinations[parseInt(e.target.value)]);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        await fetchApi(
            "http://localhost:8080/edit-exam",
            "PUT",
            JSON.stringify(toBeModified)
        );
    };

    return (
        <PlanWrapper>
            <div className={styles["plan-form_container"]}>
                <div className={styles["plan-form_select"]}>
                    {examinations.length > 0 &&
                        <InputSelect
                            name={"examination"}
                            onChangeHandler={selectChangeHandler}
                            optionsList={examinations}
                            isExaminationSelect={true}
                            selectTitle={"Select a Exam"}
                        />
                    }
                    {examinations.length === 0 && <p>No Examinations planned to edit</p>}
                </div>
                {examinations && selectedExamIdx !== "" &&
                    <form
                        className={styles["plan-form"]}
                        onSubmit={submitHandler}
                    >
                        <InputComponentWithState
                            type="text"
                            name="exam-name"
                            placeholder="Enter Exam Name"
                            value={toBeModified.exam_name}
                            onChange={examNameChangeHandler}
                            required={true}
                        />
                        <InputComponentWithState
                            type="date"
                            name="exam-date"
                            placeholder="Enter Exam Date"
                            value={toBeModified.exam_date}
                            onChange={examDateChangeHandler}
                            required={true}
                        />
                        <SubmitButton text={"Edit Exam Plan"}/>
                    </form>
                }
                {isLoading && createPortal(
                    <Toast message={"Updating..."} messageType={"info"} />,
                    document.getElementById("modal-root")
                )}
                {errorInfo.isError && createPortal(
                    <Toast message={`Error: ${errorInfo.message}`} messageType={"error"} />,
                    document.getElementById("modal-root")
                )}
                {successInfo.isSuccess && createPortal(
                    <Toast message={`Updated ${successInfo.message} plan`} messageType={"success"} />,
                    document.getElementById("modal-root")
                )}
            </div>
        </PlanWrapper>
    );
};

export default EditPlan;
