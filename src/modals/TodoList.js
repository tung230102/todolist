import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

import AddTask from './AddTask';
import ListTask from './ListTask';
import CheckComplete from './CheckComplete';

const TodoList = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('taskList'));
        const savedCompleted = JSON.parse(localStorage.getItem('taskListCompleted'));
        if (savedTodo) {
            setTaskList(savedTodo);
        }
        if (savedCompleted) {
            // setCompletedTodos(savedCompleted);
        }
    }, []);

    const saveJobsToLocalStorage = (newJobs) => {
        const jsonJobs = JSON.stringify(newJobs);
        localStorage.setItem('taskList', jsonJobs);
    };

    const saveJobsToLocalStorageCompleted = (newJobs) => {
        const jsonJobs = JSON.stringify(newJobs);
        localStorage.setItem('taskListCompleted', jsonJobs);
    };

    const handleSubmit = (name, description) => {
        const newJob = { name, description };
        const newJobs = [...taskList, newJob];
        saveJobsToLocalStorage(newJobs);
        setTaskList(newJobs);
    };

    const handleDelete = (index) => {
        const newJobs = [...taskList];
        newJobs.splice(index, 1);
        saveJobsToLocalStorage(newJobs);
        setTaskList(newJobs);
    };

    const handleDeleteCompleted = (index) => {
        const newJobs = [...completedTodos];
        newJobs.splice(index, 1);
        saveJobsToLocalStorageCompleted(newJobs);
        setCompletedTodos(newJobs);
    };

    const handleUpdate = (obj, index) => {
        const newJob = [...taskList];
        newJob[index] = obj;
        saveJobsToLocalStorage(newJob);
        setTaskList(newJob);
    };

    const handleDeleteAll = () => {
        if (isCompleteScreen) {
            setCompletedTodos([]);
            localStorage.removeItem('completedTodos');
        } else {
            setTaskList([]);
            localStorage.removeItem('todolist');
        }
    };

    const handleCompleted = (index) => {
        const newJob = { ...taskList[index] };
        const newJobs = [...completedTodos, newJob];
        setCompletedTodos(newJobs);
        handleDelete(index);
        saveJobsToLocalStorage(newJobs);
    };

    const handleInCompleted = (index) => {
        const newJob = { ...completedTodos[index] };
        const newJobs = [...taskList, newJob];
        setTaskList(newJobs);
        handleDeleteCompleted(index);
        saveJobsToLocalStorageCompleted(newJobs);
    };

    return (
        <div
            style={{
                margin: '0 auto',
                maxWidth: 700,
                padding: 20,
                border: '1px solid #ccc',
                borderRadius: 16,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginTop: 20,
            }}
        >
            <div className="header">
                <h3 className="text-center">Todo List</h3>
                <AddTask onSubmit={handleSubmit} />

                <CheckComplete
                    isCompleteScreen={isCompleteScreen}
                    setIsCompleteScreen={setIsCompleteScreen}
                />
                <Table responsive size="">
                    <thead>
                        <tr>
                            <th>To do</th>
                            <th>Description</th>
                            {isCompleteScreen ? <th>InComplete</th> : <th>Done</th>}
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {isCompleteScreen === false &&
                        taskList.map((obj, index) => (
                            <ListTask
                                key={index}
                                taskObj={obj}
                                index={index}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                isCompleteScreen={isCompleteScreen}
                                setIsCompleteScreen={setIsCompleteScreen}
                                handleCompleted={handleCompleted}
                            />
                        ))}
                    {isCompleteScreen === true &&
                        completedTodos.map((obj, index) => (
                            <ListTask
                                key={index}
                                index={index}
                                taskObj={obj}
                                onDelete={handleDeleteCompleted}
                                onUpdate={handleUpdate}
                                handleCompleted={handleInCompleted}
                            />
                        ))}
                </Table>

                <p
                    className="text-center"
                    onClick={handleDeleteAll}
                    style={{
                        cursor: 'pointer',
                        color: 'red',
                        display:
                            (taskList.length > 0 && !isCompleteScreen) ||
                            (completedTodos.length > 0 && isCompleteScreen)
                                ? 'block'
                                : 'none',
                    }}
                >
                    Clear item
                </p>

                {taskList.length === 0 && !isCompleteScreen && (
                    <p className="text-center">You Have Not To Do</p>
                )}
                {completedTodos.length === 0 && isCompleteScreen && (
                    <p className="text-center">You Have Not Completed To Do! Try Hard</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
