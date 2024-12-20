import React from "react";

import styles from "../styles/plan.module.css";
import LinkButton from "./LinkButton";

const PlanWrapper = (props) => {
    const plan_classes = `${styles["plan-exam"]} flex-container-center`

    return (
        <div className={plan_classes}>
            <div className={styles["plan-container"]}>
                {props.children}
                <LinkButton
                    to="/admin"
                    text="Back to Admin Dashboard"
                    className={styles["edit-plan_redirect_button"]}
                />
            </div>
        </div>
    )
}

export default PlanWrapper;