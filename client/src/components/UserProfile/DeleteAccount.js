import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../_actions/errorActions';
import { deleteAccount } from '../../_actions/userAction';
import { DELETE_ACCOUNT_FAIL } from '../../_actions/types';

const DeleteAccountModal = () => {
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (error.id === DELETE_ACCOUNT_FAIL) {
            alert(error.message);
        }
    }, [error]);

    // handlers
    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleDeleteAccount = () => {
        dispatch(deleteAccount());
    };

    return (
        <div>
            <Button variant="danger" onClick={handleShow}>
                Delete Account
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are you sure to delete your account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteAccountModal;
