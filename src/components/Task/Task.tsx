import { Card } from 'react-bootstrap';
import { TaskData } from '../../types/data';
import './index.css'

type TaskProps = {
    task: TaskData,
    handleModal: (content: TaskData, ind: number) => void,
    index: number,
}

function Task({task, handleModal, index}: TaskProps): JSX.Element {

return (
    <Card
      bg={'info'}
      key={task.name}
      text={'white'}
      className="mb-2 card_container"
      onClick={() => {handleModal(task, index)}}
    >
      <Card.Header>{task.name}</Card.Header>
      <Card.Body>
        
        <Card.Text>
          {task.text}
        </Card.Text>
        <Card.Text>{task.author} </Card.Text>
      </Card.Body>
    </Card>
);

}

export default Task;
