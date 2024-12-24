import {useEffect, useState} from "react";

const useFetchExams = () => {
    const [examinations, setExaminations] = useState([]);

    useEffect(() => {
        const getExaminations = async () => {
            try {
                const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

                const res = await fetch(`${serverURL}/get-examinations`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const data = await res.json();

                setExaminations(data.rows);
            } catch (e) {
                console.error(e);
            }
        }

        getExaminations().then((examinations) => {});
    }, []);

    return examinations;
}

export default useFetchExams;