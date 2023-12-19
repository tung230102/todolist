import React, { useState } from 'react';
import { Button, Input, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import EditTask from './EditTask';
import { notifyDelete, notifyDeleteErr } from './Logger';
import { useTodoContext } from './ToDoContext';

function ListTask({ taskObj, index }) {
    const {
        handleDelete,
        handleDeleteCompleted,
        handleUpdate,
        handleUpdateCompleted,
        handleCompleted,
        handleInCompleted,
        isCompleteScreen,
    } = useTodoContext();
    const [modal, setModal] = useState(false);
    const [isPopoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUpdateTask = (obj) => {
        if (isCompleteScreen) {
            handleUpdateCompleted(obj, index);
        } else {
            handleUpdate(obj, index);
        }
        toggle();
    };

    const confirmDelete = () => {
        setPopoverOpen(true);
    };

    const handleDeleteTask = () => {
        if (isCompleteScreen) {
            handleDeleteCompleted(index);
        } else {
            handleDelete(index);
        }
        setPopoverOpen(false);
        notifyDelete();
    };

    const cancelDelete = () => {
        setPopoverOpen(false);
        notifyDeleteErr();
    };

    const handleCheckboxClick = () => {
        if (isCompleteScreen) {
            handleInCompleted(index);
        } else {
            handleCompleted(index);
        }
    };

    const renderButtons = () => (
        <>
            <Button color="primary" onClick={toggle}>
                Update
            </Button>
            <Button id={`confirmDelete${index}`} color="danger" onClick={confirmDelete}>
                Delete
            </Button>
            <UncontrolledPopover
                placement="top"
                trigger="PopoverFocus"
                target={`confirmDelete${index}`}
                isOpen={isPopoverOpen}
            >
                <PopoverBody>
                    <Button color="danger" onClick={handleDeleteTask}>
                        Delete
                    </Button>
                    <Button color="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                </PopoverBody>
            </UncontrolledPopover>
        </>
    );

    return (
        <tbody>
            <tr>
                <td>{taskObj.name}</td>
                <td>{taskObj.description}</td>
                <td>
                    <Input type="checkbox" onClick={handleCheckboxClick} />
                </td>
                <td>{renderButtons()}</td>
            </tr>
            {modal && (
                <tr>
                    <td>
                        <EditTask
                            modal={modal}
                            toggle={toggle}
                            updateTask={handleUpdateTask}
                            taskObj={taskObj}
                        />
                        <ToastContainer />
                    </td>
                </tr>
            )}
        </tbody>
    );
}

export default ListTask;
