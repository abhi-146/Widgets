import React, { Component } from 'react';
import { changeOverlayStatus } from '../state/actionCreators/index'
import { connect } from 'react-redux';

class InfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPopup: false,
        };
    }

    openPopup = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                displayPopup: true
            })
        })
        this.props.changeOverlayStatus('true');
    }

    closePopup = () => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                displayPopup: false,
            })
        })
        this.props.changeOverlayStatus('false');
    }

    render() {

        let { displayPopup} = this.state;
        let { info } = this.props;
        return (
            <div className={'mjwi-popup' + (displayPopup ? '' : ' mjwi-hidden')}>
                <div className="mjwi-popup-content">
                    <span className="mjwi-popup-close" onClick={this.closePopup}>
                        &times;
                    </span>
                    <div dangerouslySetInnerHTML={{__html: info}}></div>
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
            changeOverlayStatus: (status) => { dispatch(changeOverlayStatus(status)) },
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(InfoPopup);
