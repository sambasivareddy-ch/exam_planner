import React from "react";

import styles from "../styles/table.module.css";

const TableRow = (row) => {
    return (
        <tr className={styles["table-row"]}>
            {Object.keys(row.row).map((key, index) => (
                <td key={Math.random()}>{row.row[key]}</td>
            ))}
        </tr>
    )
}

export default TableRow;