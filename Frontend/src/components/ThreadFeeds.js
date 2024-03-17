import React, { Component } from 'react';
import Button from './Button';
import EditorLeftbar from './EditorLeftbar';
import handlepreviewHtml from './WidgetPreviewHandler';
import VerifyPassPopup from './verifyPassPopup';

class ThreadFeeds extends Component {
    constructor(props) {
        super(props);
        const { widget } = props;
        const { id, htmlData, title, password, widgetType } = widget;
        let typeId = '';
        if( !widgetType ) {
            const urlSearchString = window.location.search;
            const params = new URLSearchParams(urlSearchString);
            typeId = params.get('widgetType');
        }

        this.state = {
            selectedEditor: 'Builder',
            password: '',
            passwordVerified: false,
            widget : {
            widgetType: widgetType?.id || typeId,
              id: id || '',
              title: title || 'ThreadsFeeds',
              password: password||'',
              htmlData: {
                  threadsFeeds: {
                    threadsUrl: decodeURIComponent(htmlData?.threadsFeeds?.threadsUrl || ''),
                    textColor: htmlData?.threadsFeeds?.textColor || '#000000',
                    fontSize: htmlData?.threadsFeeds?.fontSize || '16',
                    fontFamily: htmlData?.threadsFeeds?.fontFamily || 'Arial, sans-serif',
                    displayTimeElapsed: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayTimeElapsed : true,
                    displayLikeBtn: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayLikeBtn : true,
                    displayCommentBtn: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayCommentBtn : true,
                    displayRepostBtn: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayRepostBtn : true,
                    displayShareBtn: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayShareBtn : true,
                    displayReactions: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayShareBtn : true,
                    displayThreadLogo: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayThreadLogo : true,
                    displayMedia: htmlData?.threadsFeeds ? htmlData?.threadsFeeds.displayMedia : true,
                    noOfThreads: htmlData?.threadsFeeds?.noOfThreads || 5,
                    height: htmlData?.threadsFeeds?.height || 100,
                    width: htmlData?.threadsFeeds?.width || 100,
                    template: htmlData?.threadsFeeds?.template || 'list',
                    backgroundColor: htmlData?.threadsFeeds?.backgroundColor || 'white',
                  }
              },
          },
          error:'',
          serveData: {},
          previewHtml: '',
          fieldErrors: '',
          verifyPassPopup: React.createRef(),
        };
      }
      

    componentDidMount() {
        if (this.state.widget.id) {

            if (!this.state.widget.password || this.state.passwordVerified) {
                this.previewWidget();
            } else {
                this.state.verifyPassPopup.current.openPopup(this.state.widget.password);
            }
        }
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
                [name]: value,
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
                    threadsFeeds: {
                        ...prevState.widget.htmlData.threadsFeeds,
                        [name]: value,
                    },
                },
            },
        }));
    };
    

    handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
    
        this.setState((prevState) => ({
            widget: {
                ...prevState.widget,
                htmlData: {
                    ...prevState.widget.htmlData,
                    threadsFeeds: {
                        ...prevState.widget.htmlData.threadsFeeds,
                        [name]: checked
                    },
                },
            },
        }));
    };

    updateVerifyPassState = (status, password) => {

        this.setState((prevState) => {
            return ({
                ...prevState,
                passwordVerified: status,
                password: password,
            })
        }, () => {
            this.previewWidget();
        })
    }

    handleSaveHTML = async () => {
        const { handleSaveChanges } = this.props;
        const { widget } = this.state;
        this.setState({ previewHtml: '<div>Loading...</div>' });
        await handleSaveChanges(widget);
        this.setState({
            passwordVerified: false,
        }, () => {
            this.previewWidget();
        });
    };

    previewWidgetOnClick = async () => {

        this.setState({
            passwordVerified: false,
        }, () => {
            this.previewWidget();
        });

    };

    previewWidget = async() => {

        if (this.state.widget.password != "" && !this.state.passwordVerified) {
            this.setState({ previewHtml: '' });
            this.state.verifyPassPopup.current.openPopup(this.state.widget.password);
            return;
        }
        this.setState({ previewHtml: '<div>Loading...</div>' });
        const data = await handlepreviewHtml(this.state.widget, this.state.password);

        if(data.error){
            this.setState((prevState) => ({
                ...prevState,
                error: data.error
            }));
        } 
        if(data.fieldErrors){
            this.setState((prevState) => ({
                ...prevState,
                fieldErrors: data.fieldErrors
            }));
        } 
        if(data.previewHtml){
            this.setState((prevState) => ({
                ...prevState,
                previewHtml: data.previewHtml
            }));
        } 
        if(Object.keys(data.serveData).length !== 0) {
            this.setState((prevState) => ({
                ...prevState,
                serveData: data.serveData
            }));
        }

    };

    render() {
        const { selectedEditor, widget, previewHtml } = this.state;
        const { title, password } = widget;
        const { threadsFeeds } = widget.htmlData

        const fontOptions = [
            'Arial, sans-serif',
            'Times New Roman, serif',
            'Courier New, monospace',
            'Georgia, serif',
        ];

        return (
            <div className="mjwi-editor">
                <EditorLeftbar tabs={['Builder', 'Layout']} handleLeftBarClick={this.handleLeftBarClick} />
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
                            {/* <label htmlFor="builderInput">Enter password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleTitleChange}
                            /> */}
                            <label htmlFor="builderInput">Enter profile url:</label>
                            <input
                                type="text"
                                name="threadsUrl"
                                value={threadsFeeds.threadsUrl}
                                placeholder="https://www.threads.net/@zuck/"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    )}

                    {selectedEditor === 'Layout' && (
                        <div className="mjwi-editor-layout">
                            <label htmlFor="height">Height(vh):</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={threadsFeeds.height}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="width">Width(%):</label>
                            <input
                                type="number"
                                id="noOfThwidthreads"
                                name="width"
                                value={threadsFeeds.width}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="template">Template:</label>
                            <select
                                id="template"
                                name="template"
                                value={threadsFeeds.template}
                                onChange={this.handleInputChange}
                            >
                                <option value='list'>List</option>
                                <option value='grid'>Grid</option>
                                <option value='slider'>Slider</option>
                            </select>

                            <label htmlFor="backgroundColor">Background Color:</label>
                            <input
                                type="color"
                                name="backgroundColor"
                                value={threadsFeeds.backgroundColor}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="textColor">Text Color:</label>
                            <input
                                type="color"
                                name="textColor"
                                value={threadsFeeds.textColor}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="fontSize">Font Size:</label>
                            <input
                                type="number"
                                id="fontSize"
                                name="fontSize"
                                value={threadsFeeds.fontSize}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="fontFamily">Font Family:</label>
                            <select
                                id="fontFamily"
                                name="fontFamily"
                                value={threadsFeeds.fontFamily}
                                onChange={this.handleInputChange}
                            >
                                {fontOptions.map((font, index) => (
                                    <option key={index} value={font}>
                                        {font}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="displayTimeElapsed">Display Time Elapsed:</label>
                            <input
                                type="checkbox"
                                name="displayTimeElapsed"
                                checked={threadsFeeds.displayTimeElapsed}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayLikeBtn">Display Like Button:</label>
                            <input
                                type="checkbox"
                                name="displayLikeBtn"
                                checked={threadsFeeds.displayLikeBtn}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayCommentBtn">Display Comment Button:</label>
                            <input
                                type="checkbox"
                                name="displayCommentBtn"
                                checked={threadsFeeds.displayCommentBtn}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayRepostBtn">Display Repost Button:</label>
                            <input
                                type="checkbox"
                                name="displayRepostBtn"
                                checked={threadsFeeds.displayRepostBtn}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayShareBtn">Display Share Button:</label>
                            <input
                                type="checkbox"
                                name="displayShareBtn"
                                checked={threadsFeeds.displayShareBtn}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayReactions">Display Reactions(Likes & Replies):</label>
                            <input
                                type="checkbox"
                                name="displayReactions"
                                checked={threadsFeeds.displayReactions}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayThreadLogo">Display Threads Logo:</label>
                            <input
                                type="checkbox"
                                name="displayThreadLogo"
                                checked={threadsFeeds.displayThreadLogo}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="displayMedia">Display Media:</label>
                            <input
                                type="checkbox"
                                name="displayMedia"
                                checked={threadsFeeds.displayMedia}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="noOfThreads">Number of threads:</label>
                            <input
                                type="number"
                                id="noOfThreads"
                                name="noOfThreads"
                                value={threadsFeeds.noOfThreads}
                                onChange={this.handleInputChange}
                            />

                        </div>
                    )}
                    <Button name="Save" eventHandler={this.handleSaveHTML} />
                    <Button name="Preview" eventHandler={this.previewWidgetOnClick} />
                    {this.state.widget.id && (<Button name="Install" eventHandler={this.props.handleInstall} />)}
                </div>
                <div className="mjwi-editor-display">
                    <div
                        data-widget={JSON.stringify({
                            widgetData: widget,
                            serveData: this.state.serveData
                        })}
                        id="mjwi-threadsFeeds-preview"
                        className='mj-widget'
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        {previewHtml && (
                            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                        )}
                    </div>
                </div>
                <VerifyPassPopup ref={this.state.verifyPassPopup} updateVerifyPassState={this.updateVerifyPassState} />
            </div>
        );
    }
}

export default ThreadFeeds;
