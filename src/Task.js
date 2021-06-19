import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Task = (props) => {

    let {task} = props;

    const changeStatusButton = (dig, el) => {
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${el._id}`, {
                status: props.statuses[props.statuses.indexOf(el.status) + dig]
            })
            .then(() => {
                props.getList();
            })
            .catch(error => console.log(error))
    };


    const changePriorityButton = (el, dig) => {
        console.log(task.priority);
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${el._id}`, {
                priority: task.priority + dig
            })
            .then(() => {
                props.getList();
            })
            .catch(error => console.log(error));
    };


    return (

        <div className="card text-center">
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                {task.description}
                <br/>
                Priority: {task.priority}
                {' '}
                {task.priority < 5 &&
                <button onClick={() => changePriorityButton(task, 1)} className="btn btn-outline-secondary">↑</button>}
                {' '}
                {task.priority > 1 &&
                <button onClick={() => changePriorityButton(task, -1)} className="btn btn-outline-secondary">↓</button>}
                <br/>
                <hr/>
                <b>{task.status}</b>
                <hr/>
                <EditModal getList={props.getList} task={task} priorities={props.priorities} statuses={props.statuses}/>
                {' '}
                <DeleteModal deleteButton={props.deleteButton} task={task}/>
                <hr/>
                {props.statuses.indexOf(task.status) > 0 &&
                <button onClick={() => changeStatusButton(-1, task)} className="btn btn-outline-info">←</button>}
                {' '}
                {props.statuses.indexOf(task.status) < props.statuses.length - 1 &&
                <button onClick={() => changeStatusButton(1, task)} className="btn btn-outline-info">→</button>}
            </div>
        </div>
    );
};
export default Task;
