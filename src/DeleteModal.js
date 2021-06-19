import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';

const DeleteModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <span>
    <Button onClick={toggle} outline color="danger">Delete</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Delete confirmation</ModalHeader>
        <ModalBody>
            Are you sure you want to delete this task?
            <br/>
            <b>{props.task.name}</b>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-outline-danger" type="button"
                    onClick={() => props.deleteButton(props.task._id)}>Delete
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};
export default DeleteModal;
