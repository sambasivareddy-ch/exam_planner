import {useEffect, useState} from "react";

const useFetchDept = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const serverURL = process.env.REACT_APP_SERVER_URL | 'http://localhost:8080';

                const res = await fetch(`${serverURL}/get-departments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const data = await res.json();

                setDepartments(data.rows);
            } catch (e) {
                console.error(e);
            }
        }

        getDepartments().then((depts) => {});
    }, []);

    return departments;
}

export default useFetchDept;