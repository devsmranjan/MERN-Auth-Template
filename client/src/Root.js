import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './_thunks/auth';
import { getIsAuthenticated, getUser, getUserLoading } from './_selectors/auth';
import { Redirect } from 'react-router-dom';
import HomePage from './pages/Home';
import UserPage from './pages/User';

const Root = ({ isLoading, isAuthenticated, startLoadingUser }) => {
    useEffect(() => {
        startLoadingUser();
    }, []);

    return isLoading !== null ? (
        !isLoading ? (
            isAuthenticated !== null ? (
                !isAuthenticated ? (
                    <HomePage />
                ) : (
                    <Redirect to="/user" />
                )
            ) : null
        ) : null
    ) : null;
};

const mapStateToProps = (state) => ({
    isLoading: getUserLoading(state),
    isAuthenticated: getIsAuthenticated(state),
    // user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
