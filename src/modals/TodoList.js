import React, { useEffect } from 'react';
import { Table } from 'reactstrap';

import AddTask from './AddTask';
import ListTask from './ListTask';
import CheckComplete from './CheckComplete';
import { useTodoContext } from './ToDoContext';

const TodoList = () => {
    const {
        isCompleteScreen,
        taskList,
        setTaskList,
        completedTodos,
        setCompletedTodos,
        handleDeleteAll,
    } = useTodoContext();

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem('taskList'));
        const savedCompleted = JSON.parse(localStorage.getItem('taskListCompleted'));
        if (savedTodo) {
            setTaskList(savedTodo);
        }
        if (savedCompleted) {
            setCompletedTodos(savedCompleted);
        }
    }, [setTaskList, setCompletedTodos]);

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
                <AddTask />

                <CheckComplete />
                <Table responsive size="">
                    <thead>
                        <tr>
                            <th>To do</th>
                            <th>Description</th>
                            {isCompleteScreen ? <th>InComplete</th> : <th>Done</th>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {[...(isCompleteScreen ? completedTodos : taskList)].map((obj, index) => (
                        <ListTask key={index} index={index} taskObj={obj} />
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
