import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';

const ForgotPasswordModal = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
    };

    const handleShow = () => {
        setShow(true);
    };

    // data
    const [email, setEmail] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    // handlers
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        // const userDetails = { email, password };

        // Attempt to register
        // dispatch(logIn(userDetails));
    };

    return (
        <div>
            {/* <Button variant="primary" onClick={handleShow}>
                Login
            </Button> */}
            <h6 onClick={handleShow}>Forgot Password?</h6>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
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

                        <Button type="submit" variant="dark" block>
                            Send Verification Link
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ForgotPasswordModal;
