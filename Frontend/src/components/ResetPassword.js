import React, { Component } from 'react';
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      newPasswordVisible: false,
      confirmPasswordVisible: false,
      passwordMatch: true,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTogglePasswordVisibility = (field) => {
    this.setState((prevState) => ({ [`${field}Visible`]: !prevState[`${field}Visible`] }));
  };

  handleChangePassword = () => {
    const { newPassword, confirmPassword } = this.state;

    if (newPassword === confirmPassword) {
        const urlSearchString = window.location.search;
        const params = new URLSearchParams(urlSearchString);
        const userId = params.get('userId');
        const token = params.get('token');
        const request_body = {password: newPassword}

        const headers = {
            Authorization: `Bearer ${token}`,
          };

          axios.post(process.env.REACT_APP_SERVER_URL + `/user/resetPassword/${userId}`, request_body, { headers })
        .then((response) => {
            if (response.data.error) {
                
            } else {

  
            }
        })
        .catch((error) => {
            console.error('Error ', error);
        });
      this.setState({ passwordMatch: true });
    } else {
      this.setState({ passwordMatch: false });
    }
  };

  render() {
    const { passwordMatch, newPasswordVisible, confirmPasswordVisible } = this.state;

    return (
      <div className="mjwi-reset-password-page" id="mjwi-reset-password-page">
        <h1 className="mjwi-reset-password-title" id="mjwi-reset-password-title">
          Reset Password
        </h1>
        <div>
          <label className="mjwi-password-label" id="mjwi-password-label">
            New Password:
          </label>
          <input
            type={newPasswordVisible ? 'text' : 'password'}
            className="mjwi-new-password"
            name="newPassword"
            onChange={this.handleInputChange}
          />
          <button
            className="mjwi-show-password-button"
            onClick={() => this.handleTogglePasswordVisibility('newPassword')}
          >
            {newPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        <div>
          <label className="mjwi-password-label" id="mjwi-password-label">
            Confirm Password:
          </label>
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            className="mjwi-confirm-password"
            name="confirmPassword"
            onChange={this.handleInputChange}
          />
          <button
            className="mjwi-show-password-button"
            onClick={() => this.handleTogglePasswordVisibility('confirmPassword')}
          >
            {confirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        {!passwordMatch && (
          <p className="mjwi-error-message">
            Passwords do not match. Please try again.
          </p>
        )}
        <button
          className="mjwi-change-password-button"
          id="mjwi-change-password-button"
          onClick={this.handleChangePassword}
        >
          Change Password
        </button>
      </div>
    );
  }
}

export default ResetPassword;
