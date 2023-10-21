import { useState, useRef } from 'react';
import { Button, Col, Form, Input, Row } from 'reactstrap';

function AddTodo({ onCreate }) {
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const inputRef = useRef();

    const handleCreate = () => {
        if (name.trim() && detail.trim()) {
            onCreate({ name, detail, completed: false });
            setName('');
            setDetail('');
            inputRef.current.focus();
        }
    };

    return (
        <Form>
            <Row>
                <Col md={5} style={{ marginTop: 10 }}>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="list to do"
                    />
                </Col>
                <Col md={5} style={{ marginTop: 10 }}>
                    <Input
                        type="text"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="detail to do"
                    />
                </Col>
                <Col md={2} style={{ marginTop: 10 }}>
                    <Button color="primary" onClick={handleCreate}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default AddTodo;
