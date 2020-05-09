import React, {useState, useContext} from "react";
import { Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { login } from "../management/Api.js";
import { LoginStatus } from "../App.js";
import HandleLogin from "../management/LoginManagement.js";
import {AuthenticationForm} from "../widgets/AuthenticationForm.js";
import { ForceRedirect } from "../widgets/ErrorHandler.js";

export default function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoginStatus);
    const [statusCode, setStatusCode] = useState(null);
    const [response, setResponse] = useState(null);
    const [uncontrolledError, setUnControlledError] = useState(null);
    const submit = (props) => {
        login(props.email, props.password)
        .then(res => {
            if (res.statusCode===200) {
                HandleLogin(res);
                setLoggedIn(true);
            } 
            setResponse(res.data);
            setStatusCode(res.statusCode);
        })
        .catch(e => {
            setUnControlledError(e)
        });
    }

    if (loggedIn) {
        return <Redirect to="/"/>
    }

    if (uncontrolledError) {
        return <ForceRedirect message={uncontrolledError.message}/>
    }
    
    return (
        <main>
            <div className="form-inline">
                <Link to="/register">Not a member? Register here</Link>
            </div>
            <div className="form-inline">
                {statusCode===200 ? <Alert color="success">Successful Login!</Alert> : null}
                {statusCode===401 ? <Alert color="danger">{response.message}</Alert> : null}
            </div>
            <AuthenticationForm onFormSubmit={v => submit(v)} formType="login"/>
        </main>
    );
}