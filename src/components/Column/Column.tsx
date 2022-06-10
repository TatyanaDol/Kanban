import { ColumnData, TaskData } from '../../types/data';
import Task from '../Task/Task';
import { ReactComponent as ReactLogo } from './plus.svg'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import NewTaskModal from '../NewTaskModal/NewTaskModal';
import './index.css'

type ColumnProps = {
    column: ColumnData,
    changeColumnName: (name: string) => void,
    addTask: (task: TaskData) => void,
    editTask: (task: TaskData, indTask: number) => void,
    deleteTask: (indTask: number) => void,
}

function Column({ column, changeColumnName, addTask, editTask, deleteTask}: ColumnProps): JSX.Element {

    const [isEditingColumnName, setIsEditingColumnName] = useState(false);
    const [columnName, setColumnName] = useState(column.name);
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState({ name: '', text: '', author: 'some'});
    const [taskIndex, setTaskIndex] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openModal = (content: TaskData, ind: number) => {
        setModalContent(content);
        setTaskIndex(ind);
        handleShow();
    }

    const [showNewTaskModal, setNewTaskModalShow] = useState(false);
  
    const handleNewTaskModalClose = () => setNewTaskModalShow(false);
    const handleNewTaskModalShow = () => setNewTaskModalShow(true);


    return (
        <div className="col flex_column">
            <TaskModal columnName={column.name} indx={taskIndex} content={modalContent} show={show} handleClose={handleClose} editTask={editTask} deleteTask={deleteTask}/>

            {isEditingColumnName ?
                <InputGroup className="mb-3">
                    <FormControl
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={(evt) => {
                            setColumnName(evt.target.value);
                        }}
                    />
                    <Button variant="outline-secondary" id="button-addon1" onClick={(evt) => {
                        changeColumnName(columnName);
                        setIsEditingColumnName(false);
                    }}>
                        save
                    </Button>
                </InputGroup>
                : <div className="column-title_container">
                    <h3 className="column-title">{column.name}</h3> <Button variant="outline-secondary" onClick={() => {
                        setIsEditingColumnName(true);
                    }}>Edit</Button>
                </div>
            }

            {column.tasks.map((task, ind: number) => {
                return (
                    <Task key={task.name + ind} task={task} handleModal={openModal} index={ind} />
                )
            })}
            <button type="button" className="btn btn-light column__add-button" data-bs-toggle="modal" data-bs-target="#nameModal"
                onClick={
                    (evt) => {
                        handleNewTaskModalShow()
                    }
                }
            >
                <ReactLogo />
            </button>
            <NewTaskModal show={showNewTaskModal} handleClose={handleNewTaskModalClose} addTask={addTask}/>
        </div>
    );

}

export default Column;
