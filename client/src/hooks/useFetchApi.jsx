import { useState, useEffect } from 'react';

const useFetchApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorInfo, setErrorInfo] = useState({
        errorMessage: "",
        isError: false,
    });
    const [successInfo, setSuccessInfo] = useState({
        message: "",
        isSuccess: false,
        additional: null,
    });

    useEffect(() => {
        setTimeout(() => {
            setErrorInfo({
                isError: false,
                errorMessage: "",
            });
        }, 2000)
    }, [errorInfo.isError]);

    useEffect(() => {
        setTimeout(() => {
            setSuccessInfo({
                isSuccess: false,
                message: "",
            })
        }, 2000)
    }, [successInfo.isSuccess])

    const fetchApi = async (url, method, body) => {
        try {
            setIsLoading(true);

            const result = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body
            })

            if (!result.ok) {
                setErrorInfo({
                    isError: true,
                    errorMessage: "An error has occurred",
                })
            }

            const data = await result.json();

            setSuccessInfo({
                isSuccess: true,
                message: data.updated,
                additional: data?.data,
            })

            setIsLoading(false);
        } catch (e) {
            setErrorInfo({
                isError: true,
                errorMessage: e.message,
            })
        }
    }

    return {fetchApi, isLoading, errorInfo, successInfo}
}

export default useFetchApi;