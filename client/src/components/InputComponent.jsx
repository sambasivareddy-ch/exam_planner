import React, { forwardRef } from "react";

import styles from "../styles/input.module.css";

const InputComponentWithRef = forwardRef(function InputComponent(props, ref) {
    const { type, name, placeholder, required } = props;
    return (
        <input
            className={styles["input"]}
            type={type}
            name={name}
            ref={ref}
            placeholder={placeholder}
            required={required}
        />
    );
});

const InputComponentWithState = (props) => {
    const { type, name, placeholder, required, onChange, value } = props;

    return (
        <input
            className={styles["input"]}
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            required={required}
        />
    );
};

export { InputComponentWithRef, InputComponentWithState };
