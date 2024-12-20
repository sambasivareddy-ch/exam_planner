import React, {useState} from 'react';

import useFetchDept from "../../hooks/useFetchDept";
import useFetchApi from "../../hooks/useFetchApi";

import InputSelect from "../InputSelect";
import SubmitButton from "../SubmitButton";
import LinkButton from "../LinkButton";

import styles from '../../styles/database.module.css';
import {createPortal} from "react-dom";
import Toast from "../toasts/Toast";

const DeleteDatabase = () => {
    const [toBeModified, setToBeModified] = useState({});
    const { fetchApi, isLoading, errorInfo, successInfo } = useFetchApi();

    const departments = useFetchDept();

    const selectChangeHandler = (e) => {
        setToBeModified(departments[parseInt(e.target.value)]);
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        await fetchApi(
            "http://localhost:8080/delete-department",
            "DELETE",
            JSON.stringify({
                dept_id: toBeModified.dept_id,
            })
        )
    }

    return (
        <div className={styles['edit-student_info']}>
            {departments.length > 0 &&
                <form onSubmit={formSubmitHandler} className={"flex-container-row"}>
                    <InputSelect
                        optionsList={departments}
                        onChangeHandler={selectChangeHandler}
                        selectTitle={"Select a Department"}
                        isExaminationSelect={false}
                        name={"department"}
                    />
                    <SubmitButton text="Delete" />
                    <LinkButton
                        to="/admin"
                        text="Back to Admin Dashboard"
                        className={styles["edit-plan_redirect_button"]}
                    />
                </form>
            }
            {isLoading && createPortal(
                <Toast message={"Deleting..."} messageType={"info"} />,
                document.getElementById("modal-root")
            )}
            {errorInfo.isError && createPortal(
                <Toast message={`Error: ${errorInfo.message}`} messageType={"error"} />,
                document.getElementById("modal-root")
            )}
            {successInfo.isSuccess && createPortal(
                <Toast message={`Deleted ${successInfo.message} plan`} messageType={"success"} />,
                document.getElementById("modal-root")
            )}
        </div>
    )
}

export default DeleteDatabase;