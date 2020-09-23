import React, { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { verifyEmail } from '../../../_actions/authActions';
import {
    EMAIL_VERIFICATION_SUCCESS,
    EMAIL_VERIFICATION_FAIL,
} from '../../../_actions/types';

const VerifyEmailLink = (props) => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    useEffect(() => {
        const evToken = props.match.params.token;

        dispatch(verifyEmail(evToken));
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

    const validTokenComponent = (
        <div>
            <h1>This account has been verified</h1>
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
            {!auth.isLoading ? (
                auth.id === EMAIL_VERIFICATION_SUCCESS ? (
                    validTokenComponent
                ) : auth.id !== null || error.id === EMAIL_VERIFICATION_FAIL ? (
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

export default VerifyEmailLink;
