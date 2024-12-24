import React, {useState} from 'react';

import useFetchDept from "../../hooks/useFetchDept";

import InputFile from "../InputFile";
import InputSelect from "../InputSelect";
import SubmitButton from "../SubmitButton";
import LinkButton from "../LinkButton";

import styles from '../../styles/database.module.css';
import {createPortal} from "react-dom";
import Toast from "../toasts/Toast";

const EditDepartmentInfo = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [toBeModified, setToBeModified] = useState("");
    const [selectedStudentFile, setSelectedStudentFile] = useState("");
    const [selectedStaffFile, setSelectedStaffFile] = useState("");

    const departments = useFetchDept();

    const selectChangeHandler = (e) => {
        console.log(departments[parseInt(e.target.value)]);
        setToBeModified(departments[parseInt(e.target.value)].dept_id);
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("dept_id", toBeModified);
        formData.append("deptStaffFile", selectedStaffFile);
        formData.append("deptStudentFile", selectedStudentFile);

        try {
            setIsUploading(true);

            const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'

            const res = await fetch(`${serverURL}/edit-dept`, {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                console.log("Error occurred");
            }

            const data = await res.json();

            if (data.success === true) {
                setIsUploading(false);
            }

            setIsSuccess(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles['edit-student_info']}>
            <div className={styles['edit-student_info-header']}>
                {departments.length > 0 &&
                    <InputSelect
                        optionsList={departments}
                        onChangeHandler={selectChangeHandler}
                        selectTitle={"Select a Department"}
                        isExaminationSelect={false}
                        name={"department"}
                    />
                }
            </div>
            <form onSubmit={formSubmitHandler} className={"flex-container-row"}>
                <InputFile
                    name="staff"
                    file_uploaded={selectedStaffFile === "" ? "" : selectedStaffFile.name}
                    onChange={(e) => setSelectedStaffFile(e.target.files[0])}
                />
                <InputFile
                    name="student"
                    file_uploaded={selectedStudentFile === "" ? "" : selectedStudentFile.name}
                    onChange={(e) => setSelectedStudentFile(e.target.files[0])}
                />
                <SubmitButton text="Update" />
                <LinkButton
                    to="/admin"
                    text="Back to Admin Dashboard"
                    className={styles["edit-plan_redirect_button"]}
                />
            </form>
            {isUploading && createPortal(
                <Toast message={"Updating..."} messageType={"info"} />,
                document.getElementById("modal-root")
            )}
            {isSuccess && createPortal(
                <Toast message={"Updated Successfully!"} messageType={"success"} />,
                document.getElementById("modal-root")
            )}
        </div>
    )
}

export default EditDepartmentInfo;