import React from "react";
import {  Redirect } from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Permissao= ()=>{
    return (
        <>
        <Redirect to="/dashboard"/>
        <ToastContainer></ToastContainer>
        </>
    )
};

export default Permissao;