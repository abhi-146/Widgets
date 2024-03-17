import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faDisplay, faGear } from '@fortawesome/free-solid-svg-icons';

class EditorLeftbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEditor: null,
    };

  }

  render() {
    const { tabs, handleLeftBarClick } = this.props;

    return (
      <div className="mjwi-editor-leftbar">
        {Array.isArray(tabs) && tabs.includes('Builder') && (
          <div onClick={() => handleLeftBarClick('Builder')}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )}
        {Array.isArray(tabs) && tabs.includes('Layout') && (
          <div onClick={() => handleLeftBarClick('Layout')}>
            <FontAwesomeIcon icon={faDisplay} />
          </div>
        )}
        {Array.isArray(tabs) && tabs.includes('Setting') && (
          <div onClick={() => handleLeftBarClick('Setting')}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        )}
      </div>
    );
  }
}

export default EditorLeftbar;