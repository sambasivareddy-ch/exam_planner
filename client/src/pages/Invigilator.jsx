import React, {useRef, useState} from "react";

import { InputComponentWithRef } from "../components/InputComponent";
import SubmitButton from "../components/SubmitButton";
import { InvigilatorDetailsTable } from "../components/ExamDetailsTable";

import styles from "../styles/student.module.css";

const Invigilator = () => {
    const classes = `flex-container-center ${styles["invigilator-container"]}`
    const form_classes = `flex-container-col ${styles["invigilator-form"]}`;

    const emailRef = useRef("");
    const [invigilatorDetails, setInvigilatorDetails] = useState();

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const email_address = emailRef.current.value;

        try {

            const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

            const response = await fetch(`${serverURL}/invigilator-schedule/${email_address}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json();

            if (data.success) {
                setInvigilatorDetails(data.result);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className={classes}>
            <form className={form_classes} onSubmit={formSubmitHandler}>
                <h2>Get your invigilation class</h2>
                <InputComponentWithRef
                    name={"email_address"}
                    type={"text"}
                    ref={emailRef}
                    placeholder={"Enter Email Address"}
                />
                <SubmitButton text={"Submit"}/>
            </form>
            <div className={styles["student-exam__details"]}>
                {invigilatorDetails && <InvigilatorDetailsTable data={invigilatorDetails}/>}
            </div>
        </div>
    )
}

export default Invigilator;