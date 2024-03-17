import React, { Component } from 'react';
import '../App.css';
import Button from './Button';
import Widget from './Widget';
import { Link } from 'react-router-dom';
import InfoPopup from './InfoPopup';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoPopup: React.createRef(),
    };
  }
  render() {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const status = params.get('status');
    if(status == 'success'){
      this.state.infoPopup.current.openPopup();
    } 
    return (
      <div className="mjwi-widgets-wrapper">
        <div className="mjwi-widgets-leftbar">
       
        </div>
        <Widget />
        <InfoPopup info="Congrats on your purchase" ref={this.state.infoPopup} />

      </div>
    );
  }
}

export default Home;
