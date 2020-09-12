import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../_actions/errorActions';
import {
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
} from '../../_actions/types';
import { updateProfile, updatePassword } from '../../_actions/userAction';

const UpdatePassword = () => {
    const auth = useSelector((state) => state.auth);
    const userProfile = useSelector((state) => state.userProfile);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    // data
    // const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // setUser(auth.user);
        // setName(user.name);

        if (error.id === UPDATE_PASSWORD_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (show && userProfile.id === UPDATE_PASSWORD_SUCCESS) {
            alert(userProfile.message);
            handleClose();
        }
    }, [auth, error, userProfile, show]);

    // handlers
    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
    };

    const handleShow = () => {
        setShow(true);
    };

    // const handleName = (e) => {
    //     setName(e.target.value);
    // };

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // data
        const data = { currentPassword, newPassword };

        // dispatch(forgotPassword(userEmail));
        // dispatch(updateProfile(data));
        dispatch(updatePassword(data));
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Update Password
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                    ) : null}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                name="currentPassword"
                                onChange={(e) => handleCurrentPassword(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                name="newPassword"
                                onChange={(e) => handleNewPassword(e)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="dark" block>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdatePassword;
