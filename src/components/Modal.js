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