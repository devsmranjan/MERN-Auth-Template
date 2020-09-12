import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Logout from './Logout';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import ForgotPasswordModal from './ForgotPasswordModal';

const Auth = () => {
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(auth.user);
    }, [auth]);

    const authComponents = (
        <React.Fragment>
            <h2>{user ? `Welcome ${user.name}` : ''}</h2>
            <Logout />
        </React.Fragment>
    );

    const guestComponents = (
        <React.Fragment>
            <LoginModal />
            <RegisterModal />
            <div className="mt-4">
                <ForgotPasswordModal />
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
