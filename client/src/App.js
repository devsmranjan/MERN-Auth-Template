import React from 'react';

import './App.css';
import Home from './components/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ResetPassword from './components/auth/ResetPassword';
import VerifyEmailLink from './components/auth/VerifyEmailLink';
import routes from './utils/routes';

const App = () => {
    return (
        <div className="App">
            <Router>
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
            </Router>
        </div>
    );
};

export default App;
