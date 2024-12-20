import React from "react";

import LinkButton from "../components/LinkButton";
import AdminLogout from "../components/admin/AdminLogout";
import styles from "../styles/admin.module.css";

const Admin = () => {
    const classes = `${styles["admin"]} flex-container-center`;
    return (
        <div className={classes}>
            <div className={styles["admin-nav_container"]}>
                <LinkButton
                    to={"/admin/database"}
                    text="Database"
                />
                <LinkButton to={"/admin/plan-exam"} text="Plan Examination" />
                <LinkButton to={"/admin/edit-plan"} text="Edit Examination Plan" />
                <LinkButton
                    to={"/admin/cancel-plan"}
                    text="Delete the Plan"
                />
            </div>
            <AdminLogout />
        </div>
    );
};

export default Admin;
