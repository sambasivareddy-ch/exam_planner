import React from "react";

import styles from "../styles/input.module.css";

const InputFile = (props) => {
    const { name, id, file_uploaded } = props;
    const input_name = name + id;

    return (
        <div className={styles["input-file"]}>
            {file_uploaded === "" && (
                <label htmlFor={input_name}>
                    Click here to upload {name} file (CSV)
                </label>
            )}
            {file_uploaded !== "" && (
                <label htmlFor={input_name}>
                    File to be uploaded <span className={styles['file-name']}>{file_uploaded}</span>,
                    Click to re-upload new file (CSV)
                </label>
            )}
            <input
                className={styles["input"]}
                type={"file"}
                name={input_name}
                onChange={props.onChange}
                accept={".csv"}
                id={input_name}
                required={!!props.required}
            />
        </div>
    );
};

export default InputFile;
