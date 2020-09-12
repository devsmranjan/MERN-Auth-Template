import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Logout from './Logout';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResendEmailVerificationLink from './ResendEmailVerificationLink';

const Auth = () => {
    const auth = useSelector((state) => state.auth);

    const authComponents = (
        <React.Fragment>
            <Logout />
        </React.Fragment>
    );

    const guestComponents = (
        <React.Fragment>
            <LoginModal />
            <RegisterModal />
            <div className="mt-4">
                <ForgotPasswordModal />
                <ResendEmailVerificationLink />
            </div>
        </React.Fragment>
    );

    return (
        <div>
            {!auth.isLoading ? (
                auth.isAuthenticated ? (
                    authComponents
                ) : (
                    guestComponents
                )
            ) : (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </div>
    );
};

export default Auth;
