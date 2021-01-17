import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from '../../components/RaisedButton';
import Root from '../../Root';
import routes from '../../utils/routes';
import { logoutSuccess } from '../../_actions/auth';
import {
    getIsAuthenticated,
    getUser,
    getUserLoading,
} from '../../_selectors/auth';
import { loadUser } from '../../_thunks/auth';

const UserPage = ({
    isLoading,
    isAuthenticated,
    user,
    startLoadingUser,
    logoutUser,
}) => {
    useEffect(() => {
        startLoadingUser();
    }, []);

    const loadingComponent = <div>Loading...</div>;
    const content =
        user !== null ? (
            <div>
                <h1>{user.name}</h1>
                <h6>{user.id}</h6>
                <h6>{user.email}</h6>
                <h6>{user.username}</h6>

                <RaisedButton title="Logout" onClick={logoutUser} />
            </div>
        ) : null;

    return isLoading !== null ? (
        isLoading ? (
            loadingComponent
        ) : isAuthenticated !== null ? (
            !isAuthenticated ? (
                <Redirect to={routes.LOGIN_PAGE} />
            ) : (
                content
            )
        ) : null
    ) : null;
};

const mapStateToProps = (state) => ({
    isLoading: getUserLoading(state),
    isAuthenticated: getIsAuthenticated(state),
    user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingUser: () => dispatch(loadUser()),
    logoutUser: () => dispatch(logoutSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
