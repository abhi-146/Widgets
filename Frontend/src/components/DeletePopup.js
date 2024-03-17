import React, { Component } from 'react';
import Button from './Button';
import apiInstance from './apiInstance';
import { changeOverlayStatus } from '../state/actionCreators/index'
import { connect } from 'react-redux';

class DeletePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetId: '',
            displayPopup: false,
            error: ''
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
                error: ''
            })
        })
        this.props.changeOverlayStatus('false');
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

    deleteWidget = () => {

        const { widgetId } = this.state;
        apiInstance.delete(`/widget/${widgetId}`)
            .then(response => {
                this.props.deleteWidgetHandler(widgetId)
                this.closePopup()
               
            })
            .catch(error => {
                console.error('Error deleting the widget:', error);
                this.updateErrorMessage(error.response.data, "")
            });
    }

    render () {

        let {displayPopup, error} = this.state;
        return (
            <div className={'mjwi-popup mjwi-delete-pp' + (displayPopup ? '' : ' mjwi-hidden')}>
                <h2>Delete Widget</h2>
                <p>Do you really want to delete this widget?</p>
                <Button name="Delete" eventHandler={() => {this.deleteWidget()}} />
                <Button name="Cancel" eventHandler={() => {this.closePopup()}} />
                <div className={'mjwi-error' + (error ? '' : ' mjwi-hidden')}>{error}</div>
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
  
  export default connect(mapStateToProps,mapDispatchToProps,null, {forwardRef: true} )(DeletePopup);
  