import { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

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

    const handleUpdateCompleted = (obj, index) => {
        const newJob = [...completedTodos];
        newJob[index] = obj;
        saveJobsToLocalStorageCompleted(newJob);
        setCompletedTodos(newJob);
    };

    const handleDeleteAll = () => {
        if (isCompleteScreen) {
            setCompletedTodos([]);
            localStorage.removeItem('taskListCompleted');
        } else {
            setTaskList([]);
            localStorage.removeItem('taskList');
        }
    };

    const handleCompleted = (index) => {
        const newJob = { ...taskList[index] };
        const newJobs = [...completedTodos, newJob];
        setCompletedTodos(newJobs);
        handleDelete(index);
        saveJobsToLocalStorageCompleted(newJobs);
    };

    const handleInCompleted = (index) => {
        const newJob = { ...completedTodos[index] };
        const newJobs = [...taskList, newJob];
        setTaskList(newJobs);
        handleDeleteCompleted(index);
        saveJobsToLocalStorage(newJobs);
    };

    const value = {
        isCompleteScreen,
        setIsCompleteScreen,
        taskList,
        setTaskList,
        completedTodos,
        setCompletedTodos,

        handleSubmit,
        handleDelete,
        handleDeleteCompleted,
        handleUpdate,
        handleUpdateCompleted,
        handleDeleteAll,
        handleCompleted,
        handleInCompleted,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
