import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { TaskData } from '../../types/data';

type NewTaskModalProps = {
    show: boolean,
    handleClose: () => void,
    addTask: (task: TaskData) => void,
}

export default function NewTaskModal({show, handleClose, addTask}: NewTaskModalProps): JSX.Element {

    const [modalTitle, setModalTitle] = useState('');
    const [modalText, setModalText] = useState('');

    const handleSave = () => {
        const user = window.localStorage.getItem('name');
        if(user) {
            addTask({name: modalTitle, text: modalText, author: user});
            handleClose();
        }  
    }
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new task!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter task title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Make coffee"
                autoFocus
                onChange={(e) => setModalTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter task description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setModalText(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}