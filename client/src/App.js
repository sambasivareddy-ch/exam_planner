import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import useCheckLoggedIn from "./hooks/useCheckLoggedIn";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import EditPlan from "./pages/EditPlan";
import PlanExam from "./pages/PlanExam";
import Database from "./pages/Database";
import Student from "./pages/Student";
import CancelExam from "./pages/CancelExam";
import Invigilator from "./pages/Invigilator";

// Entry point of React App
function App() {
    const isLoggedIn = useSelector(state => state.admin.isLoggedIn);

    useCheckLoggedIn();

    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route path="admin">
                    {isLoggedIn &&
                        <Route index element={ <Admin /> }/>}
                    {!isLoggedIn &&
                        <Route path="login" element={ <AdminLogin /> }/>}
                    {isLoggedIn &&
                        <Route path="database" element={ <Database /> }/>}
                    {isLoggedIn &&
                        <Route path="plan-exam" element={ <PlanExam /> }/>}
                    {isLoggedIn &&
                        <Route path="edit-plan" element={ <EditPlan/> }/>}
                    {isLoggedIn &&
                        <Route path="cancel-plan" element={ <CancelExam /> }/>}
                </Route>
                <Route path="/student-schedule" element={ <Student/> } />
                <Route path="/invigilator-schedule" element={ <Invigilator /> } />
                <Route path="*" element={<h1>Page not Found</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
