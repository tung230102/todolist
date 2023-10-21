import { useState } from 'react';
import { Button } from 'reactstrap';
import UpdateTodo from './UpdateTodo';

function ListTodo({ todoList, onComplete, onDelete, onUpdate, completed }) {
    const [modals, setModals] = useState(new Array(todoList.length).fill(false));

    const toggle = (index) => {
        const newModals = [...modals];
        newModals[index] = !newModals[index];
        setModals(newModals);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Detail</th>
                    <th>Complete</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todoList.map((task, index) => (
                    <tr key={index}>
                        <td>{task.name}</td>
                        <td>{task.detail}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={completed ? task.completed : false}
                                onChange={() => onComplete(task)}
                                style={{ cursor: 'pointer' }}
                            />
                        </td>
                        <td>
                            <Button onClick={() => toggle(index)} color="primary">
                                Update
                            </Button>
                            <UpdateTodo
                                modal={modals[index]}
                                toggle={() => toggle(index)}
                                onUpdate={(updatedTask) => onUpdate(updatedTask, index)}
                                task={task}
                                onComplete={task.completed}
                            />
                            <Button onClick={() => onDelete(task)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTodo;
