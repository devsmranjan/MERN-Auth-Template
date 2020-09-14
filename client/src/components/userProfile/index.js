import React, { useState, useEffect } from 'react';
import UpdateProfileModal from './UpdateProfileModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import { useSelector } from 'react-redux';
import DeleteAccountModal from './DeleteAccount';

const UserProfile = () => {
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(auth.user);
    }, [auth]);

    const authComponents = (
        <React.Fragment>
            <h2>{user ? `Welcome ${user.name}` : ''}</h2>
            <UpdateProfileModal />
            <UpdatePasswordModal />
            <DeleteAccountModal />
        </React.Fragment>
    );

    const guestComponents = null;

    return (
        <div>
            {!auth.isLoading
                ? auth.isAuthenticated
                    ? authComponents
                    : guestComponents
                : null}
        </div>
    );
};

export default UserProfile;
