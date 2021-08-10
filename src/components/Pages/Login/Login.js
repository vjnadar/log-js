import React, { Component } from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Container, Button, FormText, UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../utility/utility';
import Spinner from '../../UI/Spinner/Spinner';

class Login extends Component {
    state = {
        email: {
            elementConfig: {
                type: 'text',
                placeholder: 'Enter email',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                email: true,
            },
            touched: false,
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 8,
            },
            touched: false,
        },
        rememberMe: {
            elementConfig: {
                type: 'checkbox',
            },
            checked: false,
        },
        isSignUp: false,
    };
    componentDidMount() {
        this.props.onClearingErrorMessage();
    }
    redirectTo = (event) => {
        if (event.target.id === 'signup') {
            this.props.history.push('/Signup');
        }
    };
    login = () => {
        console.log(this.state.rememberMe.checked);
        const credentials = {
            email: this.state.email.value,
            password: this.state.password.value,
        };
        this.props.onSendingCredentials(credentials, this.state.isSignUp);
    };
    isFormValid = () => {
        let formValid = false;
        if (this.state.email.valid && this.state.password.valid) {
            formValid = true;
            return formValid;
        }
    };
    formChangeHandler = (event) => {
        event.persist();
        if (event.target.type === 'text') {
            this.setState((prevState) => {
                return {
                    email: {
                        ...prevState.email,
                        value: event.target.value,
                        valid: checkValidity(event.target.value, { ...this.state.email['validation'] }),
                        touched: true,
                    },
                };
            });
        }
        if (event.target.id === 'password') {
            this.setState((prevState) => {
                return {
                    password: {
                        ...prevState.password,
                        value: event.target.value,
                        valid: checkValidity(event.target.value, { ...this.state.password['validation'] }),
                        touched: true,
                    },
                };
            });
        }
        if (event.target.id === 'rememberme') {
            this.setState((prevState) => {
                return {
                    rememberMe: {
                        ...prevState.rememberMe,
                        checked: !prevState.rememberMe.checked,
                    },
                };
            });
        }
    };
    loginError = (error) => {
        switch (error.trim()) {
            case 'INVALID_PASSWORD':
                return 'Oops! Wrong password. Try again.';
            case 'EMAIL_NOT_FOUND':
                return 'This is not a registered email. Try again';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later':
                return 'Too many attempts. Try again later.';
            default:
                return '';
        }
    };
    render() {
        let pageContent = (
            <>
                <Row>
                    <Col>
                        <h3 className="text-center" style={{ color: '	#2BA75C' }}>
                            Sign in
                        </h3>
                    </Col>
                </Row>
                <Form className="mt-3" onSubmit={this.login}>
                    <Container>
                        <Row>
                            <Col xs={{ size: 10, offset: 1 }} sm={{ size: 11, offset: 1 }} md={{ size: 11, offset: 1 }} lg={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        id="email"
                                        type={this.state.email.elementConfig['type']}
                                        placeholder={this.state.email.elementConfig['placeholder']}
                                        value={this.state.email.value}
                                        onChange={(event) => {
                                            this.formChangeHandler(event);
                                        }}
                                        invalid={!this.state['email'].valid && this.state['email'].touched}
                                    />
                                    {!this.state['email'].valid && this.state['email'].touched ? <FormText>Please enter a valid email</FormText> : null}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 10, offset: 1 }} sm={{ size: 11, offset: 1 }} md={{ size: 11, offset: 1 }} lg={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        id="password"
                                        type={this.state.password.elementConfig['type']}
                                        placeholder={this.state.password.elementConfig['placeholder']}
                                        value={this.state.password.value}
                                        onChange={(event) => {
                                            this.formChangeHandler(event);
                                        }}
                                        invalid={!this.state['password'].valid && this.state['password'].touched}
                                    />
                                    {!this.state['password'].valid && this.state['password'].touched ? (
                                        <FormText>Please enter a valid password with atleast 8 characters.</FormText>
                                    ) : null}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 10, offset: 1 }} sm={{ size: 11, offset: 1 }} md={{ size: 11, offset: 1 }} lg={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Label check>
                                        <Input
                                            id="rememberme"
                                            type={this.state.rememberMe.elementConfig['type']}
                                            defaultChecked={this.state.rememberMe.checked}
                                            onChange={(event) => {
                                                this.formChangeHandler(event);
                                            }}
                                        />
                                        Remember me
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 10, offset: 1 }} sm={{ size: 11, offset: 1 }} md={{ size: 11, offset: 1 }} lg={{ size: 4, offset: 4 }}>
                                <FormGroup check row>
                                    <Button id="login" color="success" size="md" disabled={!this.isFormValid()}>
                                        Sign in
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col xs={{ size: 10, offset: 1 }} sm={{ size: 11, offset: 1 }} md={{ size: 11, offset: 1 }} lg={{ size: 4, offset: 4 }}>
                                <FormText color="muted" className="mb-1">
                                    Don`t have an account? Sign up in no time.
                                </FormText>
                                <FormGroup check row>
                                    <Button id="signup" outline color="primary" size="md" onClick={this.redirectTo}>
                                        Sign up
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        {this.props.error ? (
                            <Row className="mt-1">
                                <Col xs={{ size: 10, offset: 1 }} sm={{ size: 11, offset: 1 }} md={{ size: 11, offset: 1 }} lg={{ size: 4, offset: 4 }}>
                                    <UncontrolledAlert color="warning" fade={true}>
                                        {this.loginError(this.props.error)}
                                    </UncontrolledAlert>
                                </Col>
                            </Row>
                        ) : null}
                    </Container>
                </Form>
            </>
        );
        if (this.props.loading) {
            pageContent = <Spinner />;
        }
        return <>{pageContent}</>;
    }
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token !== null,
        loading: state.authReducer.loading,
        error: state.authReducer.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSendingCredentials: (credentials, isSignUp) => {
            dispatch(actions.auth(credentials, isSignUp));
        },
        onClearingErrorMessage: () => {
            dispatch(actions.errorMessageClear());
        },
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);
