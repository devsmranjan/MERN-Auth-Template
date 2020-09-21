import React, { useState, useEffect } from 'react';
import UpdateProfileModal from './UpdateProfileModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import { useSelector } from 'react-redux';
import DeleteAccountModal from './DeleteAccount';
import { Redirect } from 'react-router-dom';
import Logout from '../Auth/Logout';

const UserProfile = () => {
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(auth.user);
    }, [auth]);

    return (
        <div>
            {!auth.isLoading && auth.isAuthenticated !== null ? (
                auth.isAuthenticated && auth.user ? (
                    <React.Fragment>
                        <h2>{user ? `Welcome ${user.name}` : ''}</h2>
                        <UpdateProfileModal />
                        <UpdatePasswordModal />
                        <DeleteAccountModal />
                        <Logout />
                    </React.Fragment>
                ) : (
                    <Redirect to="/" />
                )
            ) : null}
        </div>
    );
};

export default UserProfile;
