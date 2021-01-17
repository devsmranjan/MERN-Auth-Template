import React, { useState, useEffect } from 'react';
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
import routes from '../../utils/routes';
import { LOAD_USER_FAILURE } from '../../_actions/auth/types';
import {
    getError,
    getErrorId,
    getSigningUpLoading,
    getUserLoading,
    getIsAuthenticated,
} from '../../_selectors/auth';
import { loadUser, signup } from '../../_thunks/auth';

const SignupPage = ({
    isUserLoading,
    isAuthenticated,
    startLoadingUser,
    isSigningUpLoading,
    startSignup,
    error,
    errorId,
}) => {
    // data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        startLoadingUser();
    }, []);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const newUser = { name, email, username, password };

        // Attempt to register
        startSignup(newUser);
    };

    const loadingComponent = <div>Loading...</div>;
    const content = (
        <Container>
            <h1>Signup Page</h1>
            {error
                ? errorId !== LOAD_USER_FAILURE && (
                      <Alert variant="danger">{error}</Alert>
                  )
                : null}
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder="Smruti Ranjan Rana"
                        value={name}
                        name="name"
                        onChange={(e) => handleName(e)}
                        required
                    />
                </Form.Group>
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
                    <Form.Label>Username</Form.Label>
                    <Form.Label htmlFor="username" srOnly>
                        Username
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="username"
                            placeholder="Username"
                            value={username}
                            name="username"
                            onChange={(e) => handleUsername(e)}
                            required
                        />
                    </InputGroup>
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
                    {isSigningUpLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </Form>

            <h6>
                Already have an account? <a href="/login">Login here</a>
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
    isSigningUpLoading: getSigningUpLoading(state),
    error: getError(state),
    errorId: getErrorId(state),
});

const mapDispatchToProps = (dispatch) => ({
    startLoadingUser: () => dispatch(loadUser()),
    startSignup: (newUser) => dispatch(signup(newUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
