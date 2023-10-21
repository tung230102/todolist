import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function UpdateTodo({ modal, toggle, onUpdate, task }) {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setName(task.name);
        setDetail(task.detail);
        setCompleted(task.completed);
    }, [task]);

    const handleUpdate = () => {
        const updatedTask = {
            name: name,
            detail: detail,
            completed: completed,
        };
        onUpdate(updatedTask);
        toggle();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Detail</label>
                    <input
                        rows="5"
                        className="form-control"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                    ></input>
                </div>
                <div className="form-group mt-3">
                    <label>Completed</label>
                    <input
                        rows="5"
                        type="checkbox"
                        checked={completed}
                        onChange={() => setCompleted(!completed)}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UpdateTodo;
