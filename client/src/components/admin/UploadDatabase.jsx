import React from "react";

import DepartmentUploadForm from "./DepartmentUploadForm";
import styles from "../../styles/database.module.css";
import LinkButton from "../LinkButton";

const UploadDatabase = () => {
    const classes = `${styles["upload"]} flex-container-justify-center`;
    const upload_container_classes = `${styles["upload-container"]} grid-container`;

    return (
        <div className={classes}>
            <div className={upload_container_classes}>
                <div className={styles["upload-container__header"]}>
                    <h2>Upload Each Department at a time</h2>
                    <p>with following details: </p>
                    <ol>
                        <li>Department Name</li>
                        <li>Department Staff File (invg_email,invg_name)</li>
                        <li>Department Students File (stud_name,roll_no)</li>
                        <li>Department Classes File (dept_id, room_no)</li>
                    </ol>
                </div>
                <DepartmentUploadForm>
                    <LinkButton
                        to="/admin"
                        text="Back to Admin Dashboard"
                        className={styles["edit-plan_redirect_button"]}
                    />
                </DepartmentUploadForm>
            </div>
        </div>
    );
};

export default UploadDatabase;
