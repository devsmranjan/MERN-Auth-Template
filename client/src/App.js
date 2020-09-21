import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Root';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from 'react-router-dom';
import ResetPassword from './components/Auth/ResetPassword';
import VerifyEmailLink from './components/Auth/VerifyEmailLink';
import routes from './utils/routes';
import { useDispatch } from 'react-redux';
import { loadUser } from './_actions/authActions';

const App = (props) => {
    const dispatch = useDispatch();
    const pathName = props.location.pathname;

    useEffect(() => {
        if (
            !pathName.includes('/resetPassword') &&
            !pathName.includes('/verifyEmail')
        ) {
            dispatch(loadUser());
        }
    }, []);

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route
                    path={routes.RESET_PASSWORD}
                    component={ResetPassword}
                ></Route>
                <Route
                    path={routes.VERIFY_EMAIL}
                    component={VerifyEmailLink}
                ></Route>
            </Switch>
        </div>
    );
};

export default withRouter(App);
