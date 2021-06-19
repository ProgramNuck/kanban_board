import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';
import axios from "axios";

const EditModal = (props) => {
    let {task} = props;

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
        setNewDescription(task.description);
        setNewName(task.name);
        setNewPriority(task.priority);
    };

    const saveButton = (id) => {
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`, {
                name: newName || task.name,
                description: newDescription || task.description,
                priority: newPriority || task.priority,
                status: newStatus || task.status
            })
            .then(() => {
                setNewName(task.name);
                setNewDescription(task.description);
                setNewPriority(task.priority);
                setNewStatus(task.status);
                props.getList();
                toggle();
            })
            .catch(error => console.log(error))
    };

    let [newName, setNewName] = useState(task.name);

    let [newDescription, setNewDescription] = useState(task.description);

    let [newPriority, setNewPriority] = useState(task.priority);

    let [newStatus, setNewStatus] = useState(task.status);


    return (
        <span>
    <Button onClick={toggle} outline color="primary">Edit</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Task edition</ModalHeader>
        <ModalBody>
            <span className="input-group">
                 <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">New Name</span>
  <input value={newName} onChange={event => setNewName(event.target.value)} type="text" className="form-control"
         aria-label="Sizing example input"
         aria-describedby="inputGroup-sizing-default"/>
            </div> <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">New description</span>
  <input value={newDescription} onChange={event => setNewDescription(event.target.value)} type="text"
         className="form-control" aria-label="Sizing example input"
         aria-describedby="inputGroup-sizing-default"/>
            </div>

 <select value={newPriority} onChange={event => setNewPriority(event.target.value)}
         className="form-select form-select-sm"
         aria-label=".form-select-sm example">
    <option selected>Select new task's priority</option>
     {props.priorities.map(el => <option key={el} value={el}>{el}</option>)}
</select>
                            <br/>
            <select value={newStatus} onChange={event => setNewStatus(event.target.value)}
                    className="form-select form-select-sm" aria-label=".form-select-sm example">
                 <option selected>Select task's status</option>
                {props.statuses.map(el => <option key={el} value={el}>{el}</option>)}
            </select>
                </span>
        </ModalBody>
        <ModalFooter>
            <button disabled={newName === '' && newDescription === ''}
                    className="btn btn-outline-primary" type="button"
                    onClick={() => saveButton(task._id)}>Save
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};
export default EditModal;