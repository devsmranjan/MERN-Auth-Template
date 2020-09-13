import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logOut } from '../../_actions/authActions';

const Logout = () => {
    const dispatch = useDispatch();

    return (
        <Button variant="primary" onClick={() => dispatch(logOut())}>
            Logout
        </Button>
    );
};

export default Logout;
