import {
    Modal,
    Button,
    Form,
    Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';
import { logIn } from '../../actions/authActions';
import { LOGIN_FAIL } from '../../actions/types';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
    };
    const handleShow = () => setShow(true);

    // data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === LOGIN_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (show && auth.isAuthenticated) {
            handleClose();
        }
    }, [error, auth, show]);

    // handlers
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const userDetails = { email, password };

        // Attempt to register
        dispatch(logIn(userDetails));
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Login
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                    ) : null}
                    <Form onSubmit={(e) => handleSubmit(e)}>
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
                            Sign In
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginModal;
