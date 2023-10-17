import React, { useState } from 'react';
import { Button, Input, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import EditTask from './EditTask';
import { notifyDelete, notifyDeleteErr } from './Logger';

function List({ taskObj, index, onDelete, onUpdate, handleCompleted }) {
    const [modal, setModal] = useState(false);
    const [isPopoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUpdate = (obj) => {
        onUpdate(obj, index);
    };

    const confirmDelete = () => {
        setPopoverOpen(true);
    };

    const handleDelete = () => {
        onDelete(index);
        setPopoverOpen(false);
        notifyDelete();
    };

    const cancelDelete = () => {
        setPopoverOpen(false);
        notifyDeleteErr();
    };

    return (
        <tbody>
            <tr>
                <td>{taskObj.name}</td>
                <td>{taskObj.description}</td>
                <td>
                    <Input
                        type="checkbox"
                        onClick={() => {
                            handleCompleted(index);
                        }}
                    />
                </td>
                <td>
                    <Button color="primary" onClick={() => setModal(true)}>
                        Update
                    </Button>
                    <Button id="confirmDelete" color="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                    <UncontrolledPopover
                        placement="top"
                        trigger="PopoverFocus"
                        target="confirmDelete"
                        isOpen={isPopoverOpen}
                    >
                        <PopoverBody>
                            <Button color="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button color="secondary" onClick={cancelDelete}>
                                Cancel
                            </Button>
                        </PopoverBody>
                    </UncontrolledPopover>
                </td>
            </tr>
            <EditTask modal={modal} toggle={toggle} updateTask={handleUpdate} taskObj={taskObj} />
            <ToastContainer />
        </tbody>
    );
}

export default List;
