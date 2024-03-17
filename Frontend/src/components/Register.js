import React, { Component } from 'react';
import axios from 'axios';
import '../assets/css/Register.css';
import apiInstance from './apiInstance';
import { connect } from 'react-redux';
import Button from './Button';
import {changeCurrentUser} from '../state/actionCreators/index'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: '',
            isSignUpActive: true,
            error: '',
            fieldErrors: {},
            popupMsg: 'demo',
            showPopup: false,
            forgotPwdPp: React.createRef(),
        };
    }

    handleSignUp = (e) => {
        e.preventDefault();

        this.setState((prevState) => {
            return ({
                ...prevState,
                fieldErrors: {},
                error: ""
            })
        })


        var request_body = { email: this.state.email, password: this.state.password, username: this.state.username };
        axios.post(process.env.REACT_APP_SERVER_URL + `/user`, request_body)
            .then((response) => {
                localStorage.setItem('token', response.data.user.token);
                localStorage.setItem('userId', response.data.user.id)
                this.props.changeCurrentUser(response.data.user)
                window.location.href = "/home";
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 400 && error.response.data.fieldErrors) {
                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                fieldErrors: error.response.data.fieldErrors
                            })
                        })
                    }
                    else {
                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                error: error.response.data
                            })
                        })
                    }
                }
            });
    }

    handleSignIn = (e) => {
        e.preventDefault();

        this.setState((prevState) => {
            return ({
                ...prevState,
                fieldErrors: {},
                error: ""
            })
        })

        var request_body = { login: this.state.username, password: this.state.password };

        axios.post(process.env.REACT_APP_SERVER_URL + `/user/login`, request_body)
            .then((response) => {
                localStorage.setItem('token', response.data.user.token);
                localStorage.setItem('userId', response.data.user.id);
                this.props.changeCurrentUser(response.data.user)
                window.location.href = "/home";
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    if (error.response.status == 400 && error.response.data.fieldErrors) {

                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                fieldErrors: error.response.data.fieldErrors
                            })
                        })
                    }
                    else {

                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                error: error.response.data
                            })
                        })
                    }
                } else {
                    this.setState((prevState) => {
                        return ({
                            ...prevState,
                            error: error
                        })
                    })
                }
            });
    }

    handleForgetPass = (e) => {

        this.state.forgotPwdPp.current.openPopup();
        // var request_body = { login: this.state.username };

        // axios.post(process.env.REACT_APP_SERVER_URL + `/user/forgetPassword`, request_body)
        //     .then((response) => {
        //         this.setState((prevState) => {
        //             return ({
        //                 ...prevState,
        //                 popupMsg: 'Reset link sent to the registered email address.',
        //                 showPopup: true
        //             })
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         this.setState((prevState) => {
        //             return ({
        //                 ...prevState,
        //                 popupMsg: error.response.data,
        //                 showPopup: true
        //             })
        //         })

        //     });
    }

    handleClosePopup = () => {
        this.setState({ showPopup: false });
    };


    // Handle form input change
    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState((prevState) => {
            return ({
                ...prevState,
                [name]: value
            })
        })
    }

    togglePanel = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                isSignUpActive: !prevState.isSignUpActive,
                error: '',
                fieldErrors: {},
            })
        })
    }

    render() {
        let { username, email, password, isSignUpActive, error, fieldErrors } = this.state;
        return (
            <div className="mjwi-register-wrapper">
                <div className={`mjwi-rg-container ${isSignUpActive ? "right-panel-active" : ""}`} id="mjwi-rg-container">
                    <div className={`mjwi-rg-form-container ${isSignUpActive ? "mjwi-rg-sign-up-container" : "mjwi-rg-sign-in-container"}`}>
                        <form action="#">
                            <h1>{isSignUpActive ? "Create Account" : "Sign In"}</h1>
                            {/* <div className="mjwi-rg-social-container">
                    <a href="#" className="mjwi-rg-social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="mjwi-rg-social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="mjwi-rg-social"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                  <span>{isSignUpActive ? "or use your email for registration" : "or use your account"}</span> */}

                            <input
                                type="text"
                                placeholder="username"
                                name="username"
                                value={username}
                                onChange={this.handleInputChange}
                            />

                            {fieldErrors.username && <span className="mjwi-error">{fieldErrors.username}</span>}

                            {isSignUpActive && (
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleInputChange}
                                />
                            )}
                            {fieldErrors.email && <span className="mjwi-error">{fieldErrors.email}</span>}
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={this.handleInputChange}
                            />
                            {fieldErrors.password && <span className="mjwi-error">{fieldErrors.password}</span>}
                            {isSignUpActive ? (
                                <button
                                    onClick={this.handleSignUp}
                                    disabled={!username || !email || !password}
                                >
                                    Sign Up
                                </button>
                            ) : (
                                <button
                                    onClick={this.handleSignIn}
                                    disabled={!username || !password}
                                >
                                    Sign In
                                </button>
                            )}
                            <div className="mjwi-frgt-pswrd" onClick={this.handleForgetPass}>{isSignUpActive ? "" : "Forgot password"}</div>
                            <span className="mjwi-error">{error}</span>

                        </form>
                    </div>
                    <div className="mjwi-rg-overlay-container">
                        <div className="mjwi-rg-overlay">
                            <div className={`mjwi-rg-overlay-panel ${isSignUpActive ? "mjwi-rg-overlay-left" : "mjwi-rg-overlay-right"}`}>
                                <h1>{isSignUpActive ? "Welcome Back!" : "Hello, Friend!"}</h1>
                                <p>{isSignUpActive ? "To keep connected with us, please login with your personal info" : "Enter your personal details and start the journey with us"}</p>
                                <button className="mjwi-rg-ghost" onClick={this.togglePanel}>
                                    {isSignUpActive ? "Sign In" : "Sign Up"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showPopup && (
                    <div className="mjwi-editor-popup">
                        <div className="mjwi-editor-popup-content">
                            <span className="mjwi-editor-close" onClick={this.handleClosePopup}>
                                &times;
                            </span>
                            {this.state.popupMsg}
                        </div>
                    </div>
                )}
                <ForgotPasswordPopup ref={this.state.forgotPwdPp}/>
            </div>
        );
    }
}

class ForgotPasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            displayPopup: false,
            error: '',
            msg: "",
            fieldErrors: {}
        };
    }

    resetFields = () => {
        this.setState((prevState) => {
            return ({
                login: '',
                displayPopup: false,
                error: '',
                msg: "",
                fieldErrors: {}
            })
        })
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState((prevState) => {
            return ({
                ...prevState,
                [name]: value
            })
        })
    }

    openPopup = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                displayPopup: true,
            })
        })
    }

    closePopup = () => {
        this.resetFields();
        this.setState((prevState) => {
            return ({
                displayPopup: false,
            })
        })
    }

    updateErrorMessage = (error = "", msg = "") => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                error: error,
                msg: msg
            })
        })
    }

    sendMail = () => {

        this.setState((prevState) => {
            return ({
                ...prevState,
                error: "",
                msg: "",
                fieldErrors: {}
            })
        })
       
        const requestBody = {login: this.state.login}
        axios.post(process.env.REACT_APP_SERVER_URL + `/user/resetPassword`, requestBody)
            .then(response => {
                this.updateErrorMessage("", "Email sent successfully!")
                // this.closePopup()
               
            })
            .catch(error => {
                console.error('Error sending email:', error);
                if (error.response) {
                    if (error.response.status == 400 && error.response.data.fieldErrors) {

                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                fieldErrors: error.response.data.fieldErrors
                            })
                        })
                    }
                    else {

                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                error: error.response.data
                            })
                        })
                    }
                }
            });
    }

    render () {

        let {displayPopup, error, fieldErrors, login, msg} = this.state;
        return (
            <div className={'mjwi-popup mjwi-forgot-pwd-pp' + (displayPopup ? '' : ' mjwi-hidden')}>
                <h2>Forgot Password</h2>
                <span className="mjwi-popup-close" onClick={this.closePopup}>
                    &times;
                </span>
                <input
                    type="test"
                    placeholder="enter username or password"
                    name="login"
                    value={login}
                    onChange={this.handleInputChange}
                />
                {fieldErrors.login && <span className="mjwi-error">{fieldErrors.login}</span>}<br/>
                <Button name="Send mail" eventHandler={() => {this.sendMail()}} />
                <Button name="Cancel" eventHandler={() => {this.closePopup()}} />
                <div className={'mjwi-error' + (error ? '' : ' mjwi-hidden')}>{error}</div>
                <div className={'mjwi-msg' + (msg ? '' : ' mjwi-hidden')}>{msg}</div>
            </div>
        );
    }
}
// export default Register;
const mapStateToProps = (state) => {
    return (
        {
            user: state.currentUser,
        }
    )
}
const mapDispatchToProps = (dispatch) => {
    return (
      {
        changeCurrentUser: (user) => { dispatch(changeCurrentUser(user)) },
      }
    )
  }
export default connect(mapStateToProps, mapDispatchToProps)(Register);