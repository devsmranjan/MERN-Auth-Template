import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../_actions/errorActions';
import {
    RESEND_EMAIL_VERIFICATION_LINK_FAIL,
    RESEND_EMAIL_VERIFICATION_LINK_SUCCESS,
} from '../../_actions/types';
import { resendEmailVerificationLink } from '../../_actions/authActions';

const ResendEmailVerificationLink = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    // data
    const [email, setEmail] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === RESEND_EMAIL_VERIFICATION_LINK_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (show && auth.id === RESEND_EMAIL_VERIFICATION_LINK_SUCCESS) {
            alert(auth.message);
            handleClose();
        }
    }, [error, auth, show]);

    // handlers
    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
        setEmail('');
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // user email
        const userEmail = { email };

        dispatch(resendEmailVerificationLink(userEmail));
    };

    return (
        <div>
            <h6 onClick={handleShow}>Resend Email Verification Link</h6>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Resend Email Verification Link</Modal.Title>
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

export default ResendEmailVerificationLink;
