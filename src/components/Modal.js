import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";


export default function ModalAlert(props) {
  
    return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle}>
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