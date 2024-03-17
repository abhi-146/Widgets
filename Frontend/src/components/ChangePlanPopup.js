import React, { Component } from 'react';
import '../App.css';
import Button from './Button';
import { changeOverlayStatus } from '../state/actionCreators/index'
import { connect } from 'react-redux';

class ChangePlanPopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        msg: '',
        displayPopup: false,
      };
    }
  
    openPopup = (msg) => {
      this.setState((prevState) => {
        return ({
          ...prevState,
          msg: msg,
          displayPopup: true
        })
      })
      this.props.changeOverlayStatus('true');
    }
  
    closePopup = () => {
      this.setState((prevState) => {
        return ({
          ...prevState,
          msg: '',
          displayPopup: false,
        })
      })
      this.props.changeOverlayStatus('false');
    }
  
  
    render() {
  
      let { displayPopup, msg } = this.state;
      return (
        <div className={'mjwi-popup' + (displayPopup ? '' : ' mjwi-hidden')}>
          <div className="mjwi-popup-content">
            <span className="mjwi-popup-close" onClick={this.closePopup}>
              &times;
            </span>
            <p>{msg}</p>
            <Button href="/userPlans" name="Change plan"> </Button>
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return (
        {
            overlay: state.overlay,
        }
    )
  }
  
  const mapDispatchToProps = (dispatch) => {
    return (
        {
            changeOverlayStatus: (status) => {dispatch(changeOverlayStatus(status))},
        }
    )
  }
  
  export default connect(mapStateToProps,mapDispatchToProps,null, {forwardRef: true} )(ChangePlanPopup);