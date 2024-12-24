import React, { useState } from "react";
import {createPortal} from "react-dom";

import useFetchExams from "../hooks/useFetchExams";
import useFetchApi from "../hooks/useFetchApi";

import SubmitButton from "../components/SubmitButton";
import PlanWrapper from "../components/PlanWrapper";
import InputSelect from "../components/InputSelect";
import Toast from "../components/toasts/Toast";

const CancelExam = (props) => {
    const [toBeCancelledId, setToBeCancelledId] = useState("");
    const {fetchApi, isLoading, errorInfo, successInfo} = useFetchApi();

    const examinations = useFetchExams();

    const selectChangeHandler = (e) => {
        setToBeCancelledId(examinations[parseInt(e.target.value)].exam_plan_id);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

        await fetchApi(`${serverURL}/cancel-exam`, "DELETE", JSON.stringify({
            exam_id: toBeCancelledId,
        }));
    };

    return (
        <PlanWrapper>
            <form onSubmit={submitHandler}>
                {examinations.length > 0 &&
                    <InputSelect
                        name={"examination"}
                        onChangeHandler={selectChangeHandler}
                        optionsList={examinations}
                        isExaminationSelect={true}
                        selectTitle={"Select a Exam"}
                    />
                }
                {examinations.length === 0 && <p>No Examinations planned to cancel</p>}
                {examinations.length > 0 && <SubmitButton text={"Cancel Exam"}/>}
            </form>
            {isLoading && createPortal(
                <Toast message={"Deleting..."} messageType={"info"} />,
                document.getElementById("modal-root")
            )}
            {errorInfo.isError && createPortal(
                <Toast message={`Error: ${errorInfo.message}`} messageType={"error"} />,
                document.getElementById("modal-root")
            )}
            {successInfo.isSuccess && createPortal(
                <Toast message={`Deleted ${successInfo.message} plan`} messageType={"success"} />,
                document.getElementById("modal-root")
            )}
        </PlanWrapper>
    );
};

export default CancelExam;
