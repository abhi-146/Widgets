import React, { Component } from 'react';
import '../App.css';
import Button from './Button';
import apiInstance from './apiInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: '',
            firstName: '',
            lastName: '',
            dob: '',
            phone: '',
            occupation: '',
            website: '',
            email: '',
            username: '',
            plan: {},
            newPassword: '',
            confirmPassword: '',
            newPasswordVisible: false,
            confirmPasswordVisible: false,
            passwordMatch: true,
            error: '',
            fieldErrors: {},
        };
    }
    componentDidMount() {
        this.setState((prevState) => {
            return ({
                ...prevState,
                fieldErrors: {},
                error: ""
            })
        })
        apiInstance.get('/user/profile')
            .then(response => {
                const userData = response.data.user;
                // const formattedDob = new Date(userData.dob).toISOString().split('T')[0];
                this.setState({
                    profileImage: userData.profileImage ? decodeURIComponent(userData.profileImage) : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    // dob: formattedDob,
                    phone: userData.phone,
                    occupation: userData.occupation,
                    website: userData.website ? decodeURIComponent(userData.website) : '',
                    email: userData.email,
                    username: userData.username,
                    plan: userData.plan,
                    emailVerified: userData.emailVerified
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleEmailVerification = (e) => {
        const request_body = {
            login: this.state.email
        };
        apiInstance.post('/user/verifyEmailRequest', request_body)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
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
            });
    }
    handleSave = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                fieldErrors: {},
                error: ""
            })
        })
        const { profileImage, firstName, lastName, dob, phone, occupation, website, email, password, username } = this.state;
        const userId = localStorage.getItem('userId');
        const request_body = {
            profileImage,
            firstName,
            lastName,
            dob,
            phone,
            occupation,
            website,
            email,
            username
        };
        apiInstance.put('/user/' + userId, request_body)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
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
            });
    };
    handleDeleteAccount = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                fieldErrors: {},
                error: ""
            })
        })

        const userId = localStorage.getItem('userId');
        apiInstance.delete('/user/' + userId)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
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
            });
    };

    handleTogglePasswordVisibility = (field) => {
        this.setState((prevState) => ({ [`${field}Visible`]: !prevState[`${field}Visible`] }));
    };

    resetPassword = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                fieldErrors: {},
                error: ""
            })
        })

        const { newPassword, confirmPassword } = this.state;

        if (newPassword === confirmPassword) {
            let userId = localStorage.getItem("userId")
            const request_body = { password: newPassword }

            apiInstance.post(`/user/resetPassword/${userId}`, request_body)
                .then((response) => {
                    if (response.data.error) {

                    } else {
                        localStorage.removeItem("token")
                        window.location.reload()
                    }
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
                    }
                });
            this.setState({ passwordMatch: true });
        } else {
            this.setState({ passwordMatch: false });
        }
    }

    render() {
        let { fieldErrors, error } = this.state;

        return (
            <div className="mjwi-setting-page">
                <div className="mjwi-profile-setting">
                    <h2>Profile Settings</h2>
                    <div className='mjwi-profile-img'>
                        <img src={this.state.profileImage} alt='Profile-image' />
                    </div>
                    <div>
                        <h3>Personal Information</h3>
                        <label>Profile Image:</label>
                        <input
                            type="text"
                            name="profileImage"
                            value={this.state.profileImage}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.profileImage && <span className="mjwi-error">{fieldErrors.profileImage}</span>}
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.firstName && <span className="mjwi-error">{fieldErrors.firstName}</span>}
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.lastName && <span className="mjwi-error">{fieldErrors.lastName}</span>}
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={this.state.dob}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.dob && <span className="mjwi-error">{fieldErrors.dob}</span>}
                        <label>Phone Number:</label>
                        <input
                            type="number"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.phone && <span className="mjwi-error">{fieldErrors.phone}</span>}
                        <label>Occupation:</label>
                        <input
                            type="text"
                            name="occupation"
                            value={this.state.occupation}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.occupation && <span className="mjwi-error">{fieldErrors.occupation}</span>}
                        <label>Website:</label>
                        <input
                            type="text"
                            name="website"
                            value={decodeURIComponent(this.state.website)}
                            onChange={this.handleChange}
                        />
                        <br />
                        {fieldErrors.website && <span className="mjwi-error">{fieldErrors.website}</span>}<br />
                        <Button name="Save" eventHandler={() => { this.handleSave() }} />
                    </div>
                </div>
                <div className="mjwi-subscription-plans">
                    <h3>Subscriptions</h3>
                    <div>
                        Your current plan: {this.state.plan.name}<br/>
                        <Button href="/userPlans" name="Change plan"> </Button>
                    </div>
                </div>
                <div className="mjwi-security-setting">
                    <h3>Security</h3>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br />
                    {fieldErrors.username && <span className="mjwi-error">{fieldErrors.username}</span>}
                    <label>Email:</label>
                    {this.state.emailVerified ? (<span style={{color: 'green'}}><FontAwesomeIcon icon={faCircleCheck} /> Verified</span>) : (<span onClick={this.handleEmailVerification} style={{color: 'red', cursor: 'pointer'}}>Verify your email</span>)}
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <br />
                    {fieldErrors.email && <span className="mjwi-error">{fieldErrors.email}</span>}<br />
                    <Button name="Save" eventHandler={() => { this.handleSave() }} />
                </div>
                <div className="mjwi-delete-account">
                    <h3>Delete Account</h3>
                    <Button name="Delete Account" eventHandler={() => { this.handleDeleteAccount() }} />
                </div>
                <div className="mjwi-reset-pwd">
                    <h3>Reset Password</h3>
                    <div>
                        <label>New Password:</label>
                        <input
                            type={this.state.newPasswordVisible ? 'text' : 'password'}
                            name="newPassword"
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                        />
                        <button onClick={() => this.handleTogglePasswordVisibility('newPassword')}>
                            {this.state.newPasswordVisible ? 'Hide' : 'Show'}
                        </button><br />
                        {fieldErrors.password && <span className="mjwi-error">{fieldErrors.password}</span>}
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type={this.state.confirmPasswordVisible ? 'text' : 'password'}
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                        <button onClick={() => this.handleTogglePasswordVisibility('confirmPassword')}>
                            {this.state.confirmPasswordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {!this.state.passwordMatch && (<p className="mjwi-error">Passwords do not match. Please try again.</p>)}
                    <Button name="Reset" eventHandler={() => { this.resetPassword() }} />
                </div>
                
                <span className="mjwi-error">{error}</span>
            </div>

        );
    }
}
export default ProfileSettings;