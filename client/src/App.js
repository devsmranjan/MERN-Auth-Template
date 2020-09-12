import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { loadUser } from './_actions/authActions';
import { useDispatch } from 'react-redux';
import Auth from './components/auth';
import UserProfile from './components/userProfile';

const App = () => {
    const dispatch = useDispatch();

    const handleDispatch = () => {
        dispatch(loadUser());
    };

    useEffect(() => {
        handleDispatch();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
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
            </header>
        </div>
    );
};

export default App;
