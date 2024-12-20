import React from "react";

import styles from "../styles/button.module.css";

const SubmitButton = (props) => {
    return (
        <button className={styles["submit"]} type="submit">
            {props.text}
        </button>
    );
};

export default SubmitButton;
