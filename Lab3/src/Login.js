import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const emailInput = React.createRef();

    useEffect(() => {
        emailInput.current.focus();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Wprowadź email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailInput}
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Potwierdź
            </Button>
        </Form>
    )
};

export default Login;
