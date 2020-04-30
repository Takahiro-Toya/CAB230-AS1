import React, {useState} from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { login } from "../Api.js";

export default function Login() {
    const [error, setError] = useState(null);
    const [loggedIn, setLoggeIn] = useState(false);
    const submit = (props) => {
        login(props.email, props.password)
        .then(res => {
            if (res.statusCode===200) {
                localStorage.setItem("token", JSON.stringify(res.data.token))
                localStorage.setItem("token_type", JSON.stringify(res.data.token_type))
                localStorage.setItem("expires", JSON.stringify(res.data.expires))
                localStorage.setItem("loginStatus", "ON")
                setLoggeIn(true);
            } else if (res.statusCode===401){
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
                <Link to="/register">Not a member? Register here</Link>
            </div>
            <div className="form-inline">
                {error != null ? <Alert color="danger">{error.message}</Alert> : null}
            </div>
            <LoginForm onFormSubmit={v => submit(v)}/>
        </main>
    );
}

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formSubmit = (event) => {
        event.preventDefault()
        props.onFormSubmit({email:email, password:password});
    }
    return (
        <Form className="container" onSubmit={(e) => formSubmit(e)}>
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
            <Button type="submit" color="warning">Login</Button>
        </Form>
    );
}