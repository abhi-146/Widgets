import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import apiInstance from './apiInstance';
import { connect } from 'react-redux';
import { changeCurrentUser } from '../state/actionCreators/index'
import Stripe from './Stripe';
import InfoPopup from './InfoPopup';

class UserPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      infoPopup: React.createRef(),
    };
  }

  handleSelectPlan = async (plan) => {
    var currUser = this.props.user;

    if (Object.keys(currUser).length != 0) {
      if(plan == 'basic'){
        const userId = localStorage.getItem('userId');
        var request_body = { plan: plan };
        apiInstance.post(`/user/plan/` + userId, request_body)
          .then((response) => {
            this.setState((prevState) => {
              return ({
                ...prevState,
                msg: 'Plan updated successfully!',
              })
            })
    
            var updatedUser = { ...this.props.user };
            console.log(response)
            updatedUser.plan = response.data.plan;
            this.props.changeCurrentUser(updatedUser);
    
          })
          .catch((error) => {
            console.log(error)
            this.setState((prevState) => {
              return ({
                ...prevState,
                msg: error.response.data,
              })
            })
          });

      } else {
        var priceId = ''
        if (plan == 'starter') {
          priceId = process.env.REACT_APP_STARTER_PLAN 
        } else if (plan == 'developer') {
          priceId = process.env.REACT_APP_DEVELOPER_PLAN
        }

        const stripe = await Stripe();
        const { error } = await stripe.redirectToCheckout({
          lineItems: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode: 'subscription',
          successUrl: `http://localhost:3000/userPlans?status=success`,
          cancelUrl: `http://localhost:3000/userPlans`,
          customerEmail: currUser.email,
  
        });
        console.warn(error.message);
      }
    } else {
      window.location.href = '/register';
    }

  }


  render() {
    var currUser = this.props.user;
    var currPlan = '';
    console.log(this.state.infoPopup)
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const status = params.get('status');
    if(this.state.infoPopup.current && status == 'success'){
        // console.log(this.state.infoPopup.current)
      this.state.infoPopup.current.openPopup();
    } 

    if (Object.keys(currUser).length != 0) {
      currPlan = currUser.plan.name;
    }
    return (
      <div className="mjwi-pricing-plans-container">
        <div className="mjwi-pricing-plans">
          <div className="mjwi-pricing-card mjwi-basic">
            <div className="mjwi-heading">
              <h4>BASIC</h4>
              <p>for small websites or blogs</p>
            </div>
            <p className="mjwi-price">
              Free
            </p>
            <ul className="mjwi-features">
              <li>
                <FontAwesomeIcon icon={faCheck} />
                1 Widget
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                Categories: Label
              </li>
            </ul>
            {currPlan == "basic" ? <span className="mjwi-cta-curr-plan">CURRENT PLAN</span> :
              <button className="mjwi-cta-btn" onClick={() => this.handleSelectPlan('basic')}>SELECT</button>}
          </div>


          <div className="mjwi-pricing-card mjwi-standard">
            <div className="mjwi-heading">
              <h4>STARTER</h4>
              <p>for small websites or blogs</p>
            </div>
            <p className="mjwi-price">
              $5
              <sub>/month</sub>
            </p>
            <ul className="mjwi-features">
              <li>
                <FontAwesomeIcon icon={faCheck} />
                3 Widget
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                Categories: Label, Feeds
              </li>
            </ul>
            {currPlan == "starter" ? <span className="mjwi-cta-curr-plan">CURRENT PLAN</span> :
              <button className="mjwi-cta-btn" onClick={() => this.handleSelectPlan('starter')}>SELECT</button>}
          </div>

          <div className="mjwi-pricing-card mjwi-premium">
            <div className="mjwi-heading">
              <h4>DEVELOPER</h4>
              <p>for small websites or blogs</p>
            </div>
            <p className="mjwi-price">
              $20
              <sub>/month</sub>
            </p>
            <ul className="mjwi-features">
              <li>
                <FontAwesomeIcon icon={faCheck} />
                5 Widget
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                Categories: Label, Feeds, Appfolio
              </li>
            </ul>
            {currPlan == "developer" ? <span className="mjwi-cta-curr-plan">CURRENT PLAN</span> :
              <button className="mjwi-cta-btn" onClick={() => this.handleSelectPlan('developer')}>SELECT</button>}
          </div>
          <div className={this.state.msg ? "mjwi-msg-main" : "mjwi-hidden"} > {this.state.msg} </div>
        </div>
        <InfoPopup ref={this.state.infoPopup} info="Congrats on your purchase!"  />
        </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UserPlans);

