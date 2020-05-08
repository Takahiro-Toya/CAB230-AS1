import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { register, login } from "../management/Api.js";
import { LoginStatus } from "../App.js";
import HandleLogin from "../management/LoginManagement.js";

export default function Register() {
    const [error, setError] = useState(null);
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
                    // login failed after regisration success
                    // but, this should not happen
                    } else {
                        setError({error: true, message: "Oops! Something went wrong!"})
                    }
                })
                .catch(e => {
                    setError({error: true, message: "Oops! Something went wrong!"});
                })
            // request body incomplete
            } else if (res.statusCode===400) {
                // override error message
                setError({error: true, message: "Both Email and Password required."});
            // use already exists
            } else if (res.statusCode===409) {
                setError({error: true, message: "User already exists! Try another email address."});
            } 
        })
        .catch(e => {
            setError({error: true, message: "Oops! Something went wrong!"});
        });
    }
    
    if (loggedIn) {
        return <Redirect push to="/"/>
    }

    return (
        <main>
            <div className="form-inline">
                <Link to="/login">Already a member? Login here</Link>
            </div>
            <div className="form-inline">
                {error!==null ? <Alert color="danger">{error.message}</Alert> : null}
            </div>
            <RegistrationForm onFormSubmit={v => submit(v)}/>
        </main>
    );
}

const RegistrationForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formSubmit = (event) => {
        event.preventDefault()
        props.onFormSubmit({email:email, password:password});
    }
    // () => props.onFormSubmit()
    return (
        <Form className="container" onSubmit={(e) => formSubmit(e)}>
        {/* <Form className="container"> */}
            <FormGroup>
                <Label for="email">Email</Label>
                <Input 
                    type="email" 
                    name="email" 
                    id="loginEmail" 
                    placeholder="email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input 
                    type="password" 
                    name="password" 
                    id="loginPassword" 
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            {/* <Button color="warning" onClick={() => formSubmit()}>Register</Button> */}
            <Button type="submit" color="warning">Register</Button>
        </Form>
    );
}