import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import { notifyUpdate, notifyUpdateErr } from './Logger';

const EditTask = ({ modal, toggle, taskObj, updateTask }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setTaskName(taskObj.name);
        setDescription(taskObj.description);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateTask = () => {
        const updatedTask = {
            name: taskName,
            description: description,
        };

        updateTask(updatedTask);
        toggle();
        notifyUpdate();
    };

    const cancelUpdate = () => {
        toggle();
        notifyUpdateErr();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={cancelUpdate}>Update Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Task Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        name="taskName"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        rows="5"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdateTask}>
                    Update
                </Button>
                <Button color="secondary" onClick={cancelUpdate}>
                    Cancel
                </Button>
            </ModalFooter>
            <ToastContainer />
        </Modal>
    );
};

export default EditTask;
