import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {login} from "../store/adminSlice";

const useCheckLoggedIn = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            dispatch(login({
                email: "ssrchinta@gmail.com",
                session: "",
                isLoggedIn: true,
            }));
        }
    })
}

export default useCheckLoggedIn;