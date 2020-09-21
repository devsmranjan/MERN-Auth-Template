import React, { useEffect } from 'react';
import UserProfile from '../UserProfile';
import Auth from '../Auth';
import logo from '../../logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../_actions/authActions';
import Home from '../Home';
import { Spinner } from 'react-bootstrap';

const Root = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            {!auth.isLoading ? (
                auth.isAuthenticated && auth.user ? (
                    <Home />
                ) : (
                    <Auth />
                )
            ) : (
                <div>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}
            <div>
                <a
                    className="App-link mt-4"
                    href="/api/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    API Docs
                </a>
                <a
                    className="App-link mt-4"
                    href="https://github.com/devsmranjan/MERN-Auth-Template"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Github Repo
                </a>
            </div>
        </div>
    );
};

export default Root;
