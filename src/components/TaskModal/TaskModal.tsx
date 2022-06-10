import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import { TaskData } from '../../types/data';
import './index.css'

type TaskModalProps = {
    columnName: string,
    indx: number,
    content: TaskData,
    show: boolean,
    handleClose: () => void,
    editTask: (task: TaskData, indTask: number) => void,
    deleteTask: (indTask: number) => void,
}


export default function TaskModal({ columnName, indx, content, show, handleClose, editTask, deleteTask }: TaskModalProps): JSX.Element {

    const [isEditingTask, setIsEditingTask] = useState(false);


    const [modalTitle, setModalTitle] = useState(content.name);
    const [modalText, setModalText] = useState(content.text);

    useEffect(() => {
        setModalTitle(content.name);
        setModalText(content.text);
    }, [content])

    const handleSave = () => {
        const user = window.localStorage.getItem('name');
        if (user) {
            editTask({ name: modalTitle, text: modalText, author: user }, indx);
            setIsEditingTask(false);
            handleClose();
        }
    }

    const handleDelete = () => {
        deleteTask(indx);
        setIsEditingTask(false);
        handleClose();
    }


    const closeModal = () => {
        setIsEditingTask(false);
        handleClose();
    }

    return (
        <>

            <Modal show={show} onHide={closeModal}>

                <Modal.Header closeButton>



                </Modal.Header>
                {!isEditingTask ? <Modal.Title className="modal-title__padding">{content.name}</Modal.Title> :

                    <div className='m-2'>
                        <Form.Label htmlFor="Title" className="modal-title__padding">Edit title</Form.Label>
                        <FormControl
                            id="Title"
                            aria-label="Title"
                            value={modalTitle}
                            onChange={(evt) => {
                                setModalTitle(evt.target.value);
                            }}
                        />
                    </div>
                }
                {!isEditingTask ?
                    <Modal.Body>{content.text}</Modal.Body>
                    :
                    <Form.Group
                        className="mb-3 m-2"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label className="card-description__label">Edit task description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={modalText} onChange={(e) => {
                            setModalText(e.target.value)
                        }} />
                    </Form.Group>

                }
                <Modal.Footer>
                    <div className="modal-footer_container">
                        <div className="modal-footer_flex-container">
                            <div className="modal-footer_info">
                                <h6>Author: <span className="modal-footer__author">{content.author}</span> at: {columnName}</h6>
                            </div>

                            <div className="modal-footer_button-flex-container">
                                <Button variant="secondary" onClick={closeModal}>
                                    Close
                                </Button>
                                {isEditingTask ? <>
                                    <Button variant="danger" onClick={handleDelete} className='mx-auto'>Delete</Button>
                                    <Button variant="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                </> :
                                    <Button variant="primary" onClick={() => setIsEditingTask(true)}>
                                        Edit
                                    </Button>}
                            </div>

                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
