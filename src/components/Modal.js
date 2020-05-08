import React, {useState, useHistory, useContext} from "react";
import {Link} from "react-router-dom";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert} from "reactstrap";
import { login } from "../management/Api.js";
import HandleLogin from "../management/LoginManagement.js";
import {LoginStatus} from "../App.js";

export default function ModalAlert(props) {
  
    return (
      <div>
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
          <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
            <ModalBody>{props.body}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={props.action}>{props.option}</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>{props.closeOption}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}


export function ModalLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(LoginStatus);
  const [error, setError] = useState(null);
  const submit = (event) => {
      event.preventDefault()
      login(email, password)
      .then(res => {
          if (res.statusCode===200) {
              HandleLogin(res);
              setLoggedIn(true);
          } else if (res.statusCode===401){
              setError(res.data)
          } 
      })
      .catch(e => {
          setError(e)
      });
  }

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Login</ModalHeader>
          <Form className="container" onSubmit={(e) => submit(e)}>
            <ModalBody>
              {error != null ? <Alert color="danger">{error.message}</Alert> : null}
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
              <Link to="/register">Not a member? Register here</Link>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={props.toggle}>Cancel</Button>
              <Button type="submit" color="warning">Login</Button>
            </ModalFooter>
          </Form>
      </Modal>
    </div>
  )
}