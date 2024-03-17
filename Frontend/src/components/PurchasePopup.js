import React, { Component } from 'react';
import { changeOverlayStatus } from '../state/actionCreators/index'
import { connect } from 'react-redux';
import Stripe from './Stripe';
import Button from './Button';
import apiInstance from './apiInstance';

class purchasePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetTypeId: '',
            widgetType: {},
            widgetData: {},
            displayPopup: false,
        };
    }

    openPopup = (widgetData) => {
        console.log(widgetData)
        const widgetTypeId = widgetData.widgetType;
        const { widgetTypes } = this.props;
        let widgetType = {};

        for (const widget of widgetTypes) {
            if (widget.id === widgetTypeId) {
                widgetType = widget;
                break;
            }
        }

        this.setState((prevState) => {
            return ({
                ...prevState,
                widgetTypeId: widgetTypeId,
                widgetType: widgetType,
                widgetData: widgetData,
                displayPopup: true
            })
        })

        this.props.changeOverlayStatus('true');
    }

    closePopup = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                displayPopup: false
            })
        })

        this.props.changeOverlayStatus('false');
    }

    purchaseWidget = async () => {
        const { widgetTypeId, widgetData } = this.state;

        const { user, widgetTypes } = this.props;
        let priceId = '';
        for (const widget of widgetTypes) {
            if (widget.id === widgetTypeId) {

                priceId = widget.stripePriceId;
                break;
            }
        }
        const stripe = await Stripe();
        
        // Create a checkout session
        try {
            const response = await apiInstance.post('/create-checkout-session', {
                priceId: priceId,
                customerEmail: user.email,
                widgetData: widgetData,
            });

            const session = response.data;

            // Redirect to checkout using the created sessionId
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            // Handle any errors
            if (error) {
                console.warn(error.message);
            }
        } catch (error) {
            // Handle Axios or other errors
            console.error('Error creating checkout session:', error.message);
        }
    }


    render() {

        let { displayPopup, error, widgetType } = this.state;

        return (
            <div className={'mjwi-popup' + (displayPopup ? '' : ' mjwi-hidden')}>
                <div className="mjwi-popup-content">
                    <span className="mjwi-popup-close" onClick={this.closePopup}>
                        &times;
                    </span>
                    <p>Buy pro to unlock this widget?</p>
                    <p>{widgetType.name} Pro</p>
                    <p>Price: ${widgetType.price}</p>
                    <Button name="Purchase" eventHandler={() => { this.purchaseWidget() }} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return (
        {
            overlay: state.overlay,
            widgetTypes: state.widgetTypes,
            user: state.currentUser,
        }
    )
}
const mapDispatchToProps = (dispatch) => {
    return (
        {
            changeOverlayStatus: (status) => { dispatch(changeOverlayStatus(status)) },
        }
    )
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(purchasePopup);
