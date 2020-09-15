import React, { useEffect } from 'react';
import UserProfile from '../userProfile';
import Auth from '../auth';
import logo from '../../logo.svg';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../_actions/authActions';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />

            <UserProfile />
            <Auth />

            <a
                className="App-link mt-4"
                href="/api/docs"
                target="_blank"
                rel="noopener noreferrer"
            >
                API Docs
            </a>
        </div>
    );
};

export default Home;
