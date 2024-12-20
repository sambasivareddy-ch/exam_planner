import {useEffect, useState} from "react";

const useFetchExams = () => {
    const [examinations, setExaminations] = useState([]);

    useEffect(() => {
        const getExaminations = async () => {
            try {
                const res = await fetch('http://localhost:8080/get-examinations', {
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