import React from "react";

import styles from "../styles/table.module.css";
import TableRow from "./TableRow";

export const StudentExamDetailsTable = ({data}) => {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Exam Name</th>
                <th>Exam Date</th>
                <th>Room Number</th>
                <th>Bench Number</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <TableRow key={Math.random().toString()} row={row}/>
            ))}
            </tbody>
        </table>
    )
}

export const InvigilatorDetailsTable = ({data}) => {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Exam Name</th>
                <th>Exam Date</th>
                <th>Room Number</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <TableRow key={Math.random().toString()} row={row}/>
            ))}
            </tbody>
        </table>
    )
}