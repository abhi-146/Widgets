import React, { Component } from 'react';

class VerifyPassPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            widgetPassword: '',
            displayPopup: false,
            error: '',
        };
    }

    openPopup = (widgetPassword) => {
        console.log(this.state)
        this.setState((prevState) => {
            return ({
                ...prevState,
                password: '',
                widgetPassword: widgetPassword,
                displayPopup: true,
                error: '',
            })
        })
    }

    closePopup = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                password: '',
                displayPopup: false,
                error: '',
            })
        })
    }

    handleVerifyPassword = () => {
        const { password, widgetPassword } = this.state;
        console.log(password);
        console.log(widgetPassword)
        if (password === widgetPassword) {
            this.props.updateVerifyPassState(true, password);
            this.closePopup();
        } else {
            this.setState((prevState) => {
                return ({
                    ...prevState,
                    error: 'Invalid widget password!',
                })
            })
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            ...prevState,
            password: value,
            
        }));
    };

    render() {

        let { displayPopup, error } = this.state;
        return (
            <div className={'mjwi-popup' + (displayPopup ? '' : ' mjwi-hidden')}>
                <div className="mjwi-popup-content">
                    <input type="password" id="mjwi-password-input" className="mjwi-password-input" placeholder="Enter Password" onChange={this.handleInputChange} value={this.state.password}/>
                    <button id="mjwi-submit-button" className="mjwi-submit-button" onClick={this.handleVerifyPassword}>Submit</button>
                    <div className="mjwi-error">{error}</div>
                    <span className="mjwi-popup-close" onClick={this.closePopup}>
                        &times;
                    </span>
                </div>
            </div>
        );
    }
}

export default VerifyPassPopup;
