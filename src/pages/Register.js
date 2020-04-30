import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { register, login } from "../Api.js";

export default function Register() {
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const submit = (props) => {
        register(props.email, props.password)
        .then(res => {
            if (res.statusCode===201) {
                login(props.email, props.password)
                .then(res => {
                    if (res.statusCode===200) {
                        localStorage.setItem("token", JSON.stringify(res.data.token));
                        localStorage.setItem("token_type", JSON.stringify(res.data.token_type));
                        localStorage.setItem("expires", JSON.stringify(res.data.expires));
                        localStorage.setItem("loginStatus", "ON");
                        setLoggedIn(true);
                    } else {
                        setError({error: true, message: "Oops! Something wrong!"})
                    }
                })
            } else if (res.statusCode===400) {
                // override error message
                setError({error: true, message: "Both Email and Password required"})
            } else if (res.statusCode===409) {
                setError(res.data)
            } 
        })
        .catch(e => {
            setError(e)
        });
    }
    
    if (loggedIn) {
        return <Redirect push to="/stocks"/>
    }

    return (
        <main>
            <div className="form-inline">
                <Link to="/login">Already a member? Login here</Link>
            </div>
            <div className="form-inline">
                {error!==null ? <Alert color="danger">{error.message}</Alert> : null}
            </div>
            <RegisrationForm onFormSubmit={v => submit(v)}/>
        </main>
    );
}

const RegisrationForm = (props) => {
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