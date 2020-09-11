import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { loadUser } from './actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
    const auth = useSelector((state) => state.auth);
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

                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default App;
