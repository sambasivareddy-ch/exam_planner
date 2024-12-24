import React, { useRef, useState } from "react";

import { InputComponentWithRef } from "../InputComponent";
import InputFile from "../InputFile";
import SubmitButton from "../SubmitButton";
import Toast from "../toasts/Toast";

import styles from "../../styles/form.module.css";

const DepartmentUploadForm = (props) => {
    const classes = `flex-container-col ${styles["form-container"]}`;

    const departmentName = useRef("");
    const [deptStaffFile, setDeptStaffFile] = useState("");
    const [deptStudentFile, setDeptStudentFile] = useState("");
    const [deptRoomsFile, setDeptRoomsFile] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("department", departmentName.current.value);
        formData.append("deptStaffFile", deptStaffFile);
        formData.append("deptStudentFile", deptStudentFile);
        formData.append("deptRoomsFile", deptRoomsFile);

        try {
            setIsUploading(true);

            const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

            const res = await fetch(`${serverURL}/edit-dept`, {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                console.log("Error occurred");
            }

            const data = await res.json();

            if (data.status === "success") {
                setIsUploading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={formSubmitHandler} className={classes} encType={"multipart/form-data"}>
            <InputComponentWithRef
                name="department"
                type="text"
                placeholder="Department Name"
                ref={departmentName}
                required={true}
            />
            <InputFile
                name="staff"
                file_uploaded={deptStaffFile === "" ? "" : deptStaffFile.name}
                onChange={(e) => setDeptStaffFile(e.target.files[0])}
            />
            <InputFile
                name="students"
                file_uploaded={
                    deptStudentFile === "" ? "" : deptStudentFile.name
                }
                onChange={(e) => setDeptStudentFile(e.target.files[0])}
            />
            <InputFile
                name="rooms"
                file_uploaded={deptRoomsFile === "" ? "" : deptRoomsFile.name}
                onChange={(e) => setDeptRoomsFile(e.target.files[0])}
            />
            <SubmitButton text="Upload" />
            {props.children}
            {isUploading && <Toast message={"Uploading the files...."} messageType={"loading"}/>}
        </form>
    );
};

export default DepartmentUploadForm;
