import React from "react";

import DatabaseHeader from "../components/admin/DatabaseHeader";
import UploadDatabase from "../components/admin/UploadDatabase";
import EditDepartmentInfo from "../components/admin/EditDepartmentInfo";
import DeleteDatabase from "../components/admin/DeleteDatabase";

import styles from "../styles/database.module.css";

const Database = (props) => {

    const [index, setIndex] = React.useState(0);

    const uploadDatabaseHandler = () => {
        setIndex(0);
    }

    const editDepartmentDetails = () => {
        setIndex(1);
    }

    const deleteDatabaseHandler = () => {
        setIndex(2);
    }

    const buttonInfos = [
        {
            clickHandler: uploadDatabaseHandler,
            name: "Upload Database",
        },
        {
            clickHandler: editDepartmentDetails,
            name: "Edit Department Details",
        },
        {
            clickHandler: deleteDatabaseHandler,
            name: "Delete Database",
        }
    ]

    return (
        <div className={`${styles['database-wrapper']} flex-container-center`}>
            <DatabaseHeader buttonInfos={buttonInfos} currentIndex={index} />
            {index === 0 && (<UploadDatabase />)}
            {index === 1 && (<EditDepartmentInfo />)}
            {index === 2 && (<DeleteDatabase />)}
        </div>
    )
}

export default Database;