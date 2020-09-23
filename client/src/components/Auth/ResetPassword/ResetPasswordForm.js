import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../../_actions/authActions';
import { RESET_PASSWORD_FAIL } from '../../../_actions/types';

const ResetPasswordForm = ({ pToken }) => {
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === RESET_PASSWORD_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }
    }, [error]);

    // handlers
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const data = { pToken, password, confirmPassword };

        // Attempt to register
        dispatch(resetPassword(data));
    };

    return (
        <div>
            {errorMessage ? (
                <Alert variant="danger">{errorMessage}</Alert>
            ) : null}
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={(e) => handlePassword(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e) => handleConfirmPassword(e)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" block>
                    Reset Password
                </Button>
            </Form>
        </div>
    );
};

export default ResetPasswordForm;
