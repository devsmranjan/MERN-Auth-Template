import React from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResendEmailVerificationLink from './ResendEmailVerificationLink';

const Auth = () => {
    return (
        <React.Fragment>
            <LoginModal />
            <RegisterModal />
            <div className="mt-4">
                <ForgotPasswordModal />
                <ResendEmailVerificationLink />
            </div>
        </React.Fragment>
    );
};

export default Auth;
