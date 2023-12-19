import { useRef, useState } from 'react';
import { Button, Form, Row, Col, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import { notifyAdd, notifyAddErr } from './Logger';
import { useTodoContext } from './ToDoContext';

function AddTask() {
    const { handleSubmit } = useTodoContext();
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const inputRef = useRef();

    const handleAddTask = () => {
        if (taskName.trim() && description.trim()) {
            handleSubmit(taskName, description);
            setTaskName('');
            setDescription('');
            notifyAdd();
        } else {
            notifyAddErr();
        }
        inputRef.current.focus();
    };

    return (
        <Form>
            <Row>
                <Col md={5} style={{ marginTop: 10 }}>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="list to do"
                    />
                </Col>
                <Col md={5} style={{ marginTop: 10 }}>
                    <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="detail to do"
                    />
                </Col>
                <Col md={2} style={{ marginTop: 10 }}>
                    <Button color="primary" block onClick={handleAddTask}>
                        Submit
                    </Button>
                    <ToastContainer />
                </Col>
            </Row>
        </Form>
    );
}

export default AddTask;
