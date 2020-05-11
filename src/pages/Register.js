import React, { useState, useContext } from "react";
import { Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { register, login } from "../management/Api.js";
import { LoginStatus } from "../App.js";
import HandleLogin from "../management/LoginManagement.js";
import {AuthenticationForm} from "../widgets/AuthenticationForm.js";
import { ForceRedirect } from "../widgets/ErrorHandler.js";

/**
 * Registration page
 */
export default function Register() {
    const [uncontrolledError, setUncontrolledError] = useState(null);
    const [statusCode, setStatusCode] = useState(null); 
    const [response, setResponse] = useState(null);
    const [loggedIn, setLoggedIn] = useContext(LoginStatus);
    const submit = (props) => {
        register(props.email, props.password)
        .then(res => {
            // regisration success
            if (res.statusCode===201) {
                login(props.email, props.password)
                .then(res => {
                    //login success
                    if (res.statusCode===200) {
                        HandleLogin(res);
                        setLoggedIn(true);
                    }
                    setResponse(res.data);
                    setStatusCode(res.statusCode);
                })
                .catch(e => {
                    setUncontrolledError(e);
                })
            } else {
                setResponse(res.data);
                setStatusCode(res.statusCode);   
            }
        })
        .catch(e => {
            setUncontrolledError(e);
        });
    }
    
    if (loggedIn) {
        return <Redirect push to="/"/>
    }

    // network error
    if (uncontrolledError) {
        return <ForceRedirect message={uncontrolledError.message}/>
    }

    return (
        <main>
            <div className="form-inline">
                <Link to="/login">Already a member? Login here</Link>
            </div>
            <div className="form-inline">
                { /* shows alert according to status code */}
                {statusCode===201 ? <Alert color="success">Successful regisration!</Alert> : null}
                {statusCode===400 ? <Alert color="danger">Oops! {response.message}</Alert> : null}
                {statusCode===409 ? <Alert color="danger">Oops! {response.message}</Alert> : null}
            </div>
            <AuthenticationForm onFormSubmit={v => submit(v)} formType="register"/>
        </main>
    );
}