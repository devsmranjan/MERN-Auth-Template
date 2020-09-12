import {
    Modal,
    Button,
    Form,
    InputGroup,
    FormControl,
    Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';
import { signUp } from '../../actions/authActions';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../../actions/types';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    // data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === REGISTER_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (show && auth.id === REGISTER_SUCCESS) {
            alert(auth.message);
            handleClose();
        }
    }, [error, auth, show]);

    // handlers

    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
    };

    const handleShow = () => setShow(true);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const newUser = { name, email, username, password };

        // Attempt to register
        dispatch(signUp(newUser));
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Create new account
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                    ) : null}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                placeholder="Smruti Ranjan Rana"
                                value={name}
                                name="name"
                                onChange={(e) => handleName(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                name="email"
                                onChange={(e) => handleEmail(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Label htmlFor="username" srOnly>
                                Username
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    name="username"
                                    onChange={(e) => handleUsername(e)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                name="password"
                                onChange={(e) => handlePassword(e)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="dark" block>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RegisterModal;
