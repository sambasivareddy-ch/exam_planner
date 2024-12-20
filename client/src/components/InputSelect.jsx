import React from "react";

import styles from "../styles/input.module.css";

const InputSelect = ({
    name,
    onChangeHandler,
    selectTitle,
    optionsList,
    isExaminationSelect,
}) => {
    return (
        <select name={name} onChange={onChangeHandler} className={styles['form-select']}>
            <option value={""}>{selectTitle}</option>
            {optionsList.map((opt, idx) => {
                return (<option
                            key={Math.random()}
                            value={Number(idx).toString()}
                        >
                            {isExaminationSelect ? opt.exam_name: opt.dept_name}
                        </option>
                )
            })}
        </select>
    )
}

export default InputSelect;