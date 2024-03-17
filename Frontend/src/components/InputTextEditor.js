import React, { Component } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faDisplay, faGear } from '@fortawesome/free-solid-svg-icons';

class InputTextEditor extends Component {
  constructor(props) {
    super(props);

    const { widget } = props;
    const { id, htmlData } = widget;
    console.log(widget)
    this.state = {
      selectedEditor: 'Builder',
      widget: {
        category: 'label',
        id: id || '',
        htmlData: {
          title: htmlData?.title || 'Label',
          label: {
            text: htmlData?.label?.text || '',
            textColor: htmlData?.label?.textColor || '#000000',
            fontSize: htmlData?.label?.fontSize || '16',
            fontFamily: htmlData?.label?.fontFamily || 'Arial, sans-serif',
          }
        }
      },
      error: ""
    };
  }

  handleLeftBarClick = (editor) => {
    this.setState({
      selectedEditor: editor,
    });
  };

  
  handleTitleChange = (e) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
        widget: {
            ...prevState.widget,
            htmlData: {
                ...prevState.widget.htmlData,
                [name]: value, 
            }
        },
    }));
};

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      widget: {
        ...prevState.widget,
        htmlData: {
          ...prevState.widget.htmlData,
          label: {
            ...prevState.widget.htmlData.label,
            [name]: value,
          }
          
        },
      },
    }));
  };

  handleSaveHTML = () => {
    const { handleSaveChanges } = this.props;
    const { widget } = this.state;

    handleSaveChanges(widget);
  };

  render() {
    const { selectedEditor, widget } = this.state;
    const { title, label } = widget.htmlData;

    const fontOptions = [
      'Arial, sans-serif',
      'Times New Roman, serif',
      'Courier New, monospace',
      'Georgia, serif',
    ];

    return (
      <div className="mjwi-editor">
        <div className="mjwi-editor-leftbar">
          <div onClick={() => this.handleLeftBarClick('Builder')}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div onClick={() => this.handleLeftBarClick('Layout')}>
            <FontAwesomeIcon icon={faDisplay} />
          </div>
          <div onClick={() => this.handleLeftBarClick('Setting')}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
        <div className="mjwi-editor-main">
          {selectedEditor === 'Builder' && (
            <div className="mjwi-editor-builder">
               <label htmlFor="title">Enter widget title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={this.handleTitleChange}
                />
              <label htmlFor="builderInput">Enter text:</label>
              <input
                type="text"
                name="text"
                value={label.text}
                onChange={this.handleInputChange}
              />
            </div>
          )}

          {selectedEditor === 'Layout' && (
            <div className="mjwi-editor-layout">
              <label htmlFor="textColor">Text Color:</label>
              <input
                type="color"
                name="textColor"
                value={label.textColor}
                onChange={this.handleInputChange}
              />
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={label.fontSize}
                onChange={this.handleInputChange}
              />
              <label htmlFor="fontFamily">Font Family:</label>
              <select
                id="fontFamily"
                name="fontFamily"
                value={label.fontFamily}
                onChange={this.handleInputChange}
              >
                {fontOptions.map((font, index) => (
                  <option key={index} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button name="Save" eventHandler={this.handleSaveHTML} />
        </div>
        <div className="mjwi-editor-display">
          <div
            id="mjwi-editor-display-item"
            style={{
              marginTop: '20px',
              color: label.textColor,
              fontSize: label.fontSize + 'px',
              fontFamily: label.fontFamily,
            }}
          >
            {label.text}
          </div>
        </div>
      </div>
    );
  }
}

export default InputTextEditor;
