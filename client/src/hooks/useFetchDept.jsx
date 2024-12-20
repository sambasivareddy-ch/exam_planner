import {useEffect, useState} from "react";

const useFetchDept = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await fetch('http://localhost:8080/get-departments', {
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