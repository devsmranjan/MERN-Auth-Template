import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../_actions/errorActions';
import {
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
} from '../../_actions/types';
import { updateProfile } from '../../_actions/userAction';

const UpdateProfileModal = () => {
    const auth = useSelector((state) => state.auth);
    const userProfile = useSelector((state) => state.userProfile);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    // user from auth
    const [user, setUser] = useState({});

    // data
    const [name, setName] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUser(auth.user);
        setName(user.name);

        if (error.id === UPDATE_PROFILE_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (show && userProfile.id === UPDATE_PROFILE_SUCCESS) {
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

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // data
        const data = { name };

        dispatch(updateProfile(data));
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Update Profile
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage ? (
                        <Alert variant="danger">{errorMessage}</Alert>
                    ) : null}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                name="name"
                                onChange={(e) => handleName(e)}
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

export default UpdateProfileModal;
