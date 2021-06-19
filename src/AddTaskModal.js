import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';
import axios from "axios";

const AddTaskModal = (props) => {
    const addCard = () => {
        axios
            .post('https://nazarov-kanban-server.herokuapp.com/card', {
                "priority": priority,
                "description": description,
                "status": status,
                "name": name,
            })
            .then(() => {
                    setName('');
                    setDescription('');
                    setPriority(1);
                    setStatus(props.statuses[0]);
                    props.getList();
                    toggle();
                }
            )
            .catch(error => console.log(error))
    };

    let [name, setName] = useState('');

    let [description, setDescription] = useState('');

    let [priority, setPriority] = useState(1);

    let [status, setStatus] = useState(props.statuses[0]);

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
        setDescription('');
        setName('');
        setPriority(1);
        setStatus(props.statuses[0]);
    };

    return (
        <span>
    <Button onClick={toggle} color="primary">Add task</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Enter information about task</ModalHeader>
        <ModalBody>
            <span className="input-group">
                <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
  <input value={name} onChange={event => setName(event.target.value)} type="text" className="form-control"
         aria-label="Sizing example input"
         aria-describedby="inputGroup-sizing-default"/>
            </div> <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
  <input value={description} onChange={event => setDescription(event.target.value)} type="text"
         className="form-control" aria-label="Sizing example input"
         aria-describedby="inputGroup-sizing-default"/>
            </div>
             <select onChange={event => setPriority(event.target.value)} className="form-select form-select-sm"
                     aria-label=".form-select-sm example">
                <option selected>Select task's priority</option>
                 {props.priorities.map(el => <option key={el} value={el}>{el}</option>)}
            </select>
            <br/>
            <select onChange={event => setStatus(event.target.value)} className="form-select form-select-sm"
                    aria-label=".form-select-sm example">
                 <option selected>Select task's status</option>
                {props.statuses.map(el => <option key={el} value={el}>{el}</option>)}
            </select>
            </span>
        </ModalBody>
        <ModalFooter>
            <button disabled={name === '' || description === ''} className="btn btn-outline-primary"
                    type="button"
                    onClick={addCard}>Add
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};
export default AddTaskModal;
