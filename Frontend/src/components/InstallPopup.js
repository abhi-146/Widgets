import React, { Component } from 'react';
import { changeOverlayStatus } from '../state/actionCreators/index'
import { connect } from 'react-redux';

class InstallPopup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        widgetId: '',
        displayPopup: false,
      };
    }
  
    openPopup = (widgetId) => {
      this.setState((prevState) => {
        return ({
          ...prevState,
          widgetId: widgetId,
          displayPopup: true
        })
      })
this.props.changeOverlayStatus('true');
    }
  
    closePopup = () => {
      this.setState((prevState) => {
        return ({
          ...prevState,
          widgetId: '',
          displayPopup: false,
        })
      })
      this.props.changeOverlayStatus('false');
    }
  
    handleCopyText = () => {
      const textArea = document.querySelector('.mjwi-textarea');
      textArea.select();
      document.execCommand('copy');
      alert('Script copied to clipboard!');
    };
  
    render() {
  
      let { displayPopup, error } = this.state;
      return (
        <div className={'mjwi-popup' + (displayPopup ? '' : ' mjwi-hidden')}>
          <div className="mjwi-popup-content">
            <span className="mjwi-popup-close" onClick={this.closePopup}>
              &times;
            </span>
            <textarea
              className="mjwi-textarea"
              value={`<script src="http://localhost:3000/mj-widgets.js"></script>\n<div class='mj-widget' id='${this.state.widgetId}'></div>`}
              readOnly
            />
            <span className="mjwi-copy-icon" onClick={this.handleCopyText}>📋</span>
          </div>
        </div>
      );
    }
  }

//   export default InstallPopup;
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
  
  export default connect(mapStateToProps,mapDispatchToProps,null, {forwardRef: true} )(InstallPopup);
  