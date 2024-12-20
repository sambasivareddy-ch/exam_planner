import React, { useRef, useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { InputComponentWithRef } from "../components/InputComponent";
import SubmitButton from "../components/SubmitButton";
import Toast from "../components/toasts/Toast";

import {login} from "../store/adminSlice";

import styles from "../styles/admin.module.css";
import "../styles/_globals.css";

const AdminLogin = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shouldNavigateToAdmin, setShouldNavigateToAdmin] = useState(false);

    const container_classes = `${styles["admin-login"]} flex-container-center`;
    const form_classes = `${styles["admin-login-form"]} flex-container-col`;

    // Admin Details Holders
    const adminEmail = useRef("");
    const adminPassword = useRef("");

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const isAlreadyLoggedIn = localStorage.getItem("isLoggedIn");
        if (isAlreadyLoggedIn === 'true') {
            setShouldNavigateToAdmin(true);
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsError(false)
        }, 3000)
    }, [isError]);

    useEffect(() => {
        setTimeout(() => {
            setIsSuccess(false);
        }, 3000)
    }, [isSuccess]);

    useEffect(() => {
        if (shouldNavigateToAdmin === true) {
            navigate('/admin')
        }
    }, [shouldNavigateToAdmin])

    // Form Submit Handler
    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const enteredEmail = adminEmail.current.value;
        const enteredPassword = adminPassword.current.value;

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8080/admin-login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                })
            })

            const json = await res.json();

            if (json.success) {
                dispatch(login(json));
                localStorage.setItem("isLoggedIn", true);
                // setIsSuccess(true);

                // Go to Admin DashBoard
                // setShouldNavigateToAdmin(true);
                navigate('/admin');
            }
        } catch (error) {
            setIsError(true);
            console.log(error)
        }
        setIsLoading(false);

    };

    return (
        <div className={container_classes}>
            <form className={form_classes} onSubmit={formSubmitHandler}>
                <h2>Login as Admin</h2>
                <InputComponentWithRef
                    type="email"
                    name="email"
                    ref={adminEmail}
                    placeholder="Email Address"
                    required={true}
                />
                <InputComponentWithRef
                    type="password"
                    name="password"
                    ref={adminPassword}
                    placeholder="Password"
                    required={true}
                />
                <SubmitButton text="Login" />
            </form>
            {isLoading ?
                createPortal(
                    <Toast message={"Logging as Admin....."} messageType={"loading"}/>,
                    document.getElementById('modal-root'))
                : null }
            {isSuccess ?
                createPortal(
                    <Toast message={"Successfully LoggedIn"} messageType={"success"}/>,
                    document.getElementById('modal-root'))
                : null }
            {isError ?
                createPortal(
                    <Toast message={"Login Failed"} messageType={"error"}/>,
                    document.getElementById('modal-root'))
                : null }
        </div>
    );
};

export default AdminLogin;
