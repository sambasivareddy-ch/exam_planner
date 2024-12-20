import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/button.module.css";

/*
 * LinkButton: helps to link to different pages
 * */
const LinkButton = (props) => {
    const classes = `${styles["link-button"]} ${props.className}`;
    return (
        <button className={classes}>
            <Link to={props.to}>{props.text}</Link>
        </button>
    );
};

export default LinkButton;
