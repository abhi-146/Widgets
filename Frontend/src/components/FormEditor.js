import React, { Component } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faDisplay, faGear } from '@fortawesome/free-solid-svg-icons';
import EditorLeftbar from './EditorLeftbar';
class FormEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEditor: 'Builder',
      widgetData: {
        formFields: props.formFields || [],
      }
    };
  }

  handleLeftBarClick = (editor) => {
    this.setState({
      selectedEditor: editor,
    });
  };

  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedFormFields = [...prevState.widgetData.formFields];
      updatedFormFields[index][name] = value;
      return {
        widgetData: {
          formFields: updatedFormFields,
        },
      };
    });
  };

  handleAddField = () => {
    this.setState((prevState) => ({
      widgetData: {
        formFields: [...prevState.widgetData.formFields, { label: '', type: 'text' }],
      },
    }));
  };


  handleRemoveField = (index) => {
    this.setState((prevState) => {
      const updatedFormFields = [...prevState.widgetData.formFields];
      updatedFormFields.splice(index, 1);
      return {
        formFields: updatedFormFields,
      };
    });
  };

  handleSaveForm = () => {
    const { handleSaveChanges } = this.props;
    const { formFields } = this.state.widgetData;

    handleSaveChanges(formFields, 'form');
  };

  render() {
    const { selectedEditor} = this.state;
    const { formFields} = this.state.widgetData;

    return (
      <div className="mjwi-editor">
        {/* <div className="mjwi-editor-leftbar">
          <div onClick={() => this.handleLeftBarClick('Builder')}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div onClick={() => this.handleLeftBarClick('Layout')}>
            <FontAwesomeIcon icon={faDisplay} />
          </div>
          <div onClick={() => this.handleLeftBarClick('Setting')}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div> */}
        <EditorLeftbar />
        <div className="mjwi-editor-main">
          {selectedEditor === 'Builder' && (
            <div className="mjwi-editor-builder">
              <Button name="Add Field" eventHandler={this.handleAddField} />
              {formFields.map((field, index) => (
                <div key={index} className="mjwi-form-field">
                  <label htmlFor={`label${index}`}>Label:</label>
                  <input
                    type="text"
                    id={`label${index}`}
                    name="label"
                    value={field.label}
                    onChange={(e) => this.handleInputChange(index, e)}
                  />
                  <label htmlFor={`type${index}`}>Type:</label>
                  <select
                    id={`type${index}`}
                    name="type"
                    value={field.type}
                    onChange={(e) => this.handleInputChange(index, e)}
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    
                  </select>
                  <Button
                    name="Remove Field"
                    eventHandler={() => this.handleRemoveField(index)}
                  />
                </div>
              ))}
            </div>
          )}



          <Button name="Save" eventHandler={this.handleSaveForm} />
        </div>
        <div className="mjwi-editor-display">
    

            <div>
              <h3>Form Preview:</h3>
              <form>
                {formFields.map((field, index) => (
                  <div key={index}>
                    <label>{field.label}</label>
                    {field.type === 'text' && <input type="text" />}
                    {field.type === 'textarea' && <textarea></textarea>}
                    
                  </div>
                ))}
              </form>
            </div>
         
        </div>
      </div>
    );
  }
}

export default FormEditor;
