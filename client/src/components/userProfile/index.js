import React, { useState, useEffect } from 'react';
import UpdateProfileModal from './UpdateProfileModal';
import UpdatePassword from './UpdatePassword';
import { useSelector } from 'react-redux';

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
            <UpdatePassword />
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
