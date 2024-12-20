import React from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch} from "react-redux";

import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../store/adminSlice";
import styles from "../../styles/button.module.css";


const AdminLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickHandler = (e) => {
        e.preventDefault();

        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            localStorage.removeItem("isLoggedIn");
            dispatch(logout());
            navigate("/admin/login");
        }
    }

    return (
        <button onClick={onClickHandler} type="button" className={styles["logout-button"]}>
            <LogoutIcon /> Logout
        </button>
    )
}

export default AdminLogout;