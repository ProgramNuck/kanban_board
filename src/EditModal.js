import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';
import axios from "axios";

const EditModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
        setNewDescription('');
        setNewName('');
        setNewPriority(0);
    };

    const saveButton = (id) => {
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`, {
                name: newName || props.task.name,
                description: newDescription || props.task.description,
                priority: newPriority || props.task.priority,
            })
            .then(res => {
                setNewName('');
                setNewDescription('');
                setNewPriority(0);
                props.getList();
                toggle();
            })
            .catch(error => console.log(error))
    };

    let [newName, setNewName] = useState('');

    let [newDescription, setNewDescription] = useState('');

    let [newPriority, setNewPriority] = useState(0);


    return(
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

 <select onChange={event => setNewPriority(event.target.value)} className="form-select form-select-sm" aria-label=".form-select-sm example">
    <option value="0" selected>Select new task's priority</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>
                </span>
        </ModalBody>
        <ModalFooter>
            <button disabled={newName === '' && newDescription === '' && newPriority === 0} className="btn btn-outline-primary" type="button"
                    onClick={() => saveButton(props.task._id)}>Save
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};
export default EditModal;