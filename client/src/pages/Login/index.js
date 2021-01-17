import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Form,
    InputGroup,
    FormControl,
    Alert,
    Container,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Root from '../../Root';
import routes from '../../utils/routes';
import { LOAD_USER_FAILURE } from '../../_actions/auth/types';
import {
    getError,
    getErrorId,
    getLoggingInLoading,
    getUserLoading,
    getIsAuthenticated,
} from '../../_selectors/auth';
import { loadUser, login } from '../../_thunks/auth';

const LoginPage = ({
    isUserLoading,
    isAuthenticated,
    startLoadingUser,
    isLoggingInLoading,
    startLogin,
    error,
    errorId,
}) => {
    // data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        startLoadingUser();
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const data = { email, password };

        // Attempt to login
        startLogin(data);
    };

    const loadingComponent = <div>Loading...</div>;
    const content = (
        <Container>
            <h1>Login Page</h1>
            {error
                ? errorId !== LOAD_USER_FAILURE && (
                      <Alert variant="danger">{error}</Alert>
                  )
                : null}
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        name="email"
                        onChange={(e) => handleEmail(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={(e) => handlePassword(e)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="dark" block>
                    {isLoggingInLoading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>

            <h6>
                New user? Create an account <a href="/signup">here</a>
            </h6>
        </Container>
    );

    return isUserLoading !== null ? (
        isUserLoading ? (
            loadingComponent
        ) : isAuthenticated !== null ? (
            !isAuthenticated ? (
                content
            ) : (
                <Redirect to={routes.USER_PAGE} />
            )
        ) : null
    ) : null;
};

const mapStateToProps = (state) => ({
    isUserLoading: getUserLoading(state),
    isAuthenticated: getIsAuthenticated(state),
    isLoggingInLoading: getLoggingInLoading(state),
    error: getError(state),
    errorId: getErrorId(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingUser: () => dispatch(loadUser()),
    startLogin: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
