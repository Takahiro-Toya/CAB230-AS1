import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

/**
 * Modal alert view
 * @param {*} props isOpen: defines if this modal should be appeared
 *                  toggle: a method that changes isOpen state
 *                  title: title
 *                  body: body message
 *                  action: what action should be taken when clicked {option} button clicked
 *                  option: the text of action button (e.g. OK, Done)
 *                  closeOption: the text of close option (e.g. Close, Cancel)
 */
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