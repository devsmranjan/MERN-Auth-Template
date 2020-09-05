import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const App = () => {
    const getData = async () => {
        try {
            const response = await axios.get('/api');
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {}, [getData()]);

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default App;