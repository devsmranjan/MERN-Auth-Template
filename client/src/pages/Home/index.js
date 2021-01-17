import React from 'react';
import logo from '../../logo.svg';
import { Button } from 'react-bootstrap';

const HomePage = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Button variant="primary" href="/login">
                Login
            </Button>
            <Button variant="primary" href="/signup">
                Signup
            </Button>
            <div>
                <a
                    className="App-link"
                    href="/api/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    API Docs
                </a>
            </div>
            <div>
                <a
                    className="App-link mt-4"
                    href="https://github.com/devsmranjan/MERN-Auth-Template"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github Repo
                </a>
            </div>
        </header>
    );
};

export default HomePage;
