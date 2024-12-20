import React from "react";

import LinkButton from "../components/LinkButton";
import styles from "../styles/home.module.css";
import exam from "../images/8786977.jpg";
import "../styles/_globals.css";

/*
 * Renders all the navigation buttons to show to the user
 * */
const Home = (props) => {
    const container_classes = `grid-container ${styles["home"]}`;
    const nav_classes = `${styles["nav-container"]} flex-container-center`;

    return (
        <div className={container_classes}>
            <div className={styles["banner"]}>
                <img src={exam} alt="Exam" />
            </div>
            <div className={nav_classes}>
                <LinkButton to="/admin/login" text="Admin Login" />
                <div className={styles["sub-nav_container"]}>
                    <LinkButton to="/student-schedule" text="Student" />
                    <LinkButton to="/invigilator-schedule" text="Invigilator" />
                </div>
            </div>
        </div>
    );
};

export default Home;
