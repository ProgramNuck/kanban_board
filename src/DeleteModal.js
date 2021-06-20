import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';

const DeleteModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let [confirmValue, setInputValue] = useState('');


    return (
        <span>
    <Button onClick={toggle} outline color="danger">Delete</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Are you sure you want to delete this task?</ModalHeader>
        <ModalBody>
            This action <b>cannot</b> be undone. This will <b>permanently</b> delete the {props.task.name} task.
            <br/>
            <br/>
            Please type <b>{props.task.name}</b> to confirm
  <input type="text" className="form-control" placeholder="Enter here"
         aria-label="Recipient's username with two button addons" onChange={event => setInputValue(event.target.value)}/>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-outline-danger" type="button"
                    disabled={confirmValue !== props.task.name}
                    onClick={() => props.deleteButton(props.task._id)}>Confirm
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};
export default DeleteModal;
