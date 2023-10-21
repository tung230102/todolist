import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

import AddTodo from './AddTodo.js';
import ListTodo from './ListTodo.js';

function TodoApp() {
    const [todoList, setTodoList] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);

    const handleCreate = (newTask) => {
        const newTodos = [...todoList, newTask];
        saveToLocalStorage(newTodos);
        setTodoList(newTodos);
    };

    const saveToLocalStorage = (newTodos) => {
        const jsonTodos = JSON.stringify(newTodos);
        localStorage.setItem('todoList', jsonTodos);
    };

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todoList'));
        if (savedTodos) {
            setTodoList(savedTodos);
        }
    }, []);

    const handleComplete = (task) => {
        const newTodos = todoList.map((item) =>
            item === task ? { ...item, completed: !item.completed } : item,
        );
        setTodoList(newTodos);
        saveToLocalStorage(newTodos);
    };

    const handleDelete = (task) => {
        const newTodos = [...todoList];
        newTodos.splice(task, 1);
        setTodoList(newTodos);
        saveToLocalStorage(newTodos);
    };

    const handleUpdate = (task, index) => {
        const newJob = [...todoList];
        newJob[index] = task;
        setTodoList(newJob);
        saveToLocalStorage(newJob);
    };

    const completedTodoList = todoList.filter((todo) => todo.completed);
    const incompleteTodoList = todoList.filter((todo) => !todo.completed);

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
            <h2 className="text-center">TodoList</h2>
            <AddTodo onCreate={handleCreate} />
            <div style={{ margin: '16px 0' }}>
                <Button
                    onClick={() => setShowCompleted(false)}
                    color={showCompleted ? 'secondary' : 'primary'}
                >
                    Show Doing
                </Button>
                <Button
                    onClick={() => setShowCompleted(true)}
                    color={!showCompleted ? 'secondary' : 'primary'}
                >
                    Show Done
                </Button>
            </div>
            <ListTodo
                todoList={showCompleted ? completedTodoList : incompleteTodoList}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                completed={showCompleted}
            />
        </div>
    );
}

export default TodoApp;
