import React, {forwardRef, useState} from "react";

import styles from "../styles/input.module.css";

const InputWithLabel = forwardRef(function InputWithLabel(props, ref) {
    const { type, name, label } = props;
    return (
        <div className={`${styles["input-label"]} flex-container-row`}>
            <input
                className={styles["input"]}
                type={type}
                name={name}
                ref={ref}
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
});

const CheckBoxWithoutInputShown = (props) => {
    const { name, label, onChange, value, is_checked } = props;

    return (
        <div className={`${styles["input-checkbox"]}`}>
            <input
                type="checkbox"
                name={name}
                value={value}
                onChange={onChange}
                checked={is_checked}
                id={name}
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export { InputWithLabel, CheckBoxWithoutInputShown };
