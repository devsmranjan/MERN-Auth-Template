import { Switch, Route, withRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import Root from './Root';
import routes from './utils/routes';
import './App.css';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import UserPage from './pages/User';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Root} />
                <Route exact path={routes.LOGIN_PAGE} component={LoginPage} />
                <Route exact path={routes.SIGNUP_PAGE} component={SignupPage} />
                <Route exact path={routes.USER_PAGE} component={UserPage} />

                <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
        </div>
    );
}

export default App;
