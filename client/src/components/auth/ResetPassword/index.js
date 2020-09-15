import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
    RESET_PASSWORD_TOKEN_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from '../../../_actions/types';
import { Spinner } from 'react-bootstrap';
import { checkResetPasswordLink } from '../../../_actions/authActions';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = (props) => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    const [passwordToken, setPasswordToken] = useState('');

    useEffect(() => {
        const pToken = props.match.params.token;

        setPasswordToken(pToken);
        dispatch(checkResetPasswordLink(pToken));
    }, []);

    const invalidTokenComponent = (
        <div>
            <h1>{error.message}</h1>
            <Button
                varient="primary"
                onClick={() => {
                    props.history.push('/');
                }}
            >
                Go To Home Page
            </Button>
        </div>
    );

    const validTokenComponent = <ResetPasswordForm pToken={passwordToken} />;

    const successComponent = (
        <div>
            <h1>Password Reset Successfully</h1>
            <Button
                varient="primary"
                onClick={() => {
                    props.history.push('/');
                }}
            >
                Go To Home Page
            </Button>
        </div>
    );

    return (
        <div>
            {auth.id === RESET_PASSWORD_SUCCESS ? (
                successComponent
            ) : !auth.isLoading ? (
                auth.id === RESET_PASSWORD_TOKEN_SUCCESS ? (
                    validTokenComponent
                ) : auth.id !== null || error.id === RESET_PASSWORD_FAIL ? (
                    invalidTokenComponent
                ) : null
            ) : (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </div>
    );
};

export default ResetPassword;
