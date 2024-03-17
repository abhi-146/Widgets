import React, { Component } from 'react';
import Button from './Button';
import apiInstance from './apiInstance';
import '../assets/css/files.css';
import EditorLeftbar from './EditorLeftbar';
import ReactDOMServer from 'react-dom/server';
import VerifyPassPopup from './verifyPassPopup';

class Files extends Component {
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
            widget: {
                widgetType: widgetType?.id || typeId,
                id: id || '',
                password: password || '',
                title: title || 'Files',
                uploadedFiles: [],
                removedFiles: [],
                htmlData: {
                    files: {
                        docs: htmlData?.files?.docs || [],
                        preview: htmlData?.files?.preview || 'currentTab',
                    }
                },
            },
            displayFiles: [],
            serveData: {},
            previewHtml: '',
            fieldErrors: '',
            verifyPassPopup: React.createRef(),
        };
    }


    async componentDidMount() {
        if (this.state.widget.id) {
            this.convertDocsIdToFiles();
            if (!this.state.widget.password || this.state.passwordVerified) {
                this.previewWidget();
            } else {
                this.state.verifyPassPopup.current.openPopup(this.state.widget.password);
            }

           
        }
    }

    convertDocsIdToFiles = async () => {
        const { widget } = this.state;
        const { docs } = widget.htmlData.files;
        const { password } = widget;
        this.setState({
            displayFiles: [],
        });

        if (docs && docs.length > 0 && widget.id) {

            try {
                const response = await apiInstance.get(`/widget/file/all/` + widget.id, {
                    headers: {
                        password: password
                    }
                });

                if (response.data && response.data) {
                    this.setState({
                        displayFiles: response.data,
                    }, () => {
                        if (!this.state.widget.password || this.state.passwordVerified) {
                            this.previewWidget();
                        }
                    });
                }
            } catch (error) {
                console.log(error);
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

    handleFilesSelect = (e) => {
        var { widget, displayFiles } = this.state;
        var { uploadedFiles } = widget;
    
        const newFiles = Array.from(e.target.files);
        this.setState((prevState) => ({
            ...prevState,  
            widget: {
                ...widget,
                uploadedFiles: [...uploadedFiles, ...newFiles],
            }
        }), () => {
            e.target.value = null;
            this.previewWidget();
        });
    }
    


    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            widget: {
                ...prevState.widget,
                htmlData: {
                    ...prevState.widget.htmlData,
                    [name]: value,
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

    renderFilePreview = (file) => {

        let { name, thumbnailUrl } = file;
        const fileExtension = name.split('.').pop().toLowerCase();
        if (!thumbnailUrl) {
            switch (fileExtension) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                    thumbnailUrl = URL.createObjectURL(file); 
                    break;
                case 'pdf':
                    thumbnailUrl = process.env.REACT_APP_SERVER_URL + '/uploads/thumbnails/pdf-thumbnail.png';
                    break;
                case 'mp3':
                    thumbnailUrl = process.env.REACT_APP_SERVER_URL + '/uploads/thumbnails/audio-thumbnail.png';
                    break;
                case 'mp4':
                    thumbnailUrl = process.env.REACT_APP_SERVER_URL + '/uploads/thumbnails/video-thumbnail.png';
                    break;
                default:
                    thumbnailUrl = process.env.REACT_APP_SERVER_URL + '/uploads/thumbnails/file-thumbnail.png';
                    break;
            }
            
        } else {
            thumbnailUrl = decodeURIComponent(thumbnailUrl)
        }

        return <img src={thumbnailUrl} alt="Image Preview" />;
    };

    

    handleFilePreview = (file) => {
        let { name, url } = file;
        if (!url) {
            url = URL.createObjectURL(file);
        } else {
            url = decodeURIComponent(url);
        }
        const fileExtension = name.split('.').pop().toLowerCase();
        let previewHtml = '';
    
        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                previewHtml = ReactDOMServer.renderToString(<img src={url} alt="Image Preview" />);
                break;
            case 'pdf':
                // Using Adobe PDF viewer
                previewHtml = ReactDOMServer.renderToString(<iframe src={`${decodeURIComponent(url)}`} width="100%" height="600px"></iframe>);
                break;
            case 'mp3':
                previewHtml = ReactDOMServer.renderToString(<audio controls><source src={url} type="audio/mp3" /></audio>);
                break;
            case 'mp4':
                previewHtml = ReactDOMServer.renderToString(<video controls width="320" height="240"><source src={url} type="video/mp4" /></video>);
                break;
            default:
                previewHtml = ReactDOMServer.renderToString(<p>Unable to load preview. <a href={url} download={name}>Click here to download</a></p>);
                break;
        }
    
        document.querySelector('.mjwi-editor-file-full-preview').innerHTML = previewHtml;
        document.querySelector('.mjwi-editor-file-full-preview').style.display = 'block';
        document.querySelector('.mjwi-fls-hide-preview').style.display = 'block';
        document.querySelector('.mjwi-editor-display').style.display = 'none';
    };
    
    

    handleDeleteSavedFile = (id) => {
        console.log(id)
        let svfiles = [...this.state.displayFiles];

        svfiles = svfiles.filter(file => file.id !== id);

        this.setState({
            displayFiles: svfiles,
        }, () => {
            this.previewWidget();
        });

        let rmvFiles = [...this.state.widget.removedFiles];
        rmvFiles.push(id);
        this.setState({
            widget: {
                ...this.state.widget,
                removedFiles: rmvFiles,
            }
        })
    }

    handleDeleteUploadedFile = (index) => {
        let files = [...this.state.widget.uploadedFiles];
        files.splice(index, 1);
        this.setState({
            widget: {
                ...this.state.widget,
                uploadedFiles: files,
            }
        },() => {
            this.previewWidget();
        })
    }


    // handleCheckboxChange = (e) => {
    //     const { name, checked } = e.target;

    //     this.setState((prevState) => ({
    //         widget: {
    //             ...prevState.widget,
    //             htmlData: {
    //                 ...prevState.widget.htmlData,
    //                 files: {
    //                     ...prevState.widget.htmlData.files,
    //                     [name]: checked
    //                 },
    //             },
    //         },
    //     }));
    // };

    
    previewWidgetOnClick = async () => {

        this.setState({
            passwordVerified: false,
        }, () => {
            this.previewWidget();
        });

    };

    previewWidget = () => {

        if (this.state.widget.password != "" && !this.state.passwordVerified) {
            this.setState({ previewHtml: '' });
            this.state.verifyPassPopup.current.openPopup(this.state.widget.password);
            return;
        }

        const {widget, displayFiles} = this.state;
        const {uploadedFiles} = widget;
        const htmlString = ReactDOMServer.renderToString(
            <div className = "mjwi-fls-file-previews">
                {displayFiles && displayFiles.map((file, index) => (
                    <div key={index} className="mjwi-fls-file-preview" onClick={() => this.handleFilePreview(file)}>
                        {this.renderFilePreview(file)}
                        <span className="mjwi-fls-filename">{file.displayName}</span>
                    </div>
                ))}
                {uploadedFiles && uploadedFiles.map((file, index) => (
                    <div key={index} className="mjwi-fls-file-preview" onClick={() => this.handleFilePreview(file)}>
                        {this.renderFilePreview(file)}
                        <span className="mjwi-fls-filename">{file.name}</span>
                    </div>
                ))}
            </div>
        );

        this.setState({ previewHtml: htmlString });
    }
    

    handleSaveHTML = async () => {
        const { handleSaveChanges } = this.props;
        const { widget } = this.state;
        await handleSaveChanges(widget);
        this.setState((prevState) => {
            return ({
                ...prevState,
                passwordVerified: false,
                previewHtml: '',
            })
        },  () => {
            this.previewWidgetOnClick();
        });
    };

    render() {

        const { selectedEditor, widget, previewHtml, displayFiles } = this.state;
        const { files, title, password, uploadedFiles } = widget;

        return (
            <div className="mjwi-editor">
                <EditorLeftbar tabs={['Builder']} handleLeftBarClick={this.handleLeftBarClick} />
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
                            <label htmlFor="builderInput">Enter password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleTitleChange}
                            />

                            <label htmlFor="fileInput">Upload files:</label>
                            <input
                                type="file"
                                name="fileInput"
                                onChange={this.handleFilesSelect}
                                multiple
                            />

                            <h2>Files:</h2>
                            <div className="mjwi-fls-file-editor">
                                {displayFiles && displayFiles.map((file, index) => (
                                    <div key={index} className="mjwi-fls-file-edit">
                                        <span className="mjwi-fls-filename">{file.displayName}</span>
                                        <span onClick={() => this.handleDeleteSavedFile(file.id)}>❌</span>
                                    </div>
                                ))}
                                {uploadedFiles && uploadedFiles.map((file, index) => (
                                    <div key={index} className="mjwi-fls-file-edit">
                                        <span className="mjwi-fls-filename">{file.name}</span>
                                        <span onClick={() => this.handleDeleteUploadedFile(index)}>❌</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedEditor === 'Layout' && (
                        <div className="mjwi-editor-layout">
                            Layout editor
                        </div>
                    )}
                    {selectedEditor === 'Setting' && (
                        <div className="mjwi-editor-layout">
                            Setting editor
                        </div>
                    )}
                    <Button name="Save" eventHandler={this.handleSaveHTML} />

                </div>
                <span className="mjwi-fls-hide-preview mjwi-hidden" onClick={() => {
                    document.querySelector('.mjwi-editor-file-full-preview').style.display = 'none';
                    document.querySelector('.mjwi-editor-display').style.display = 'block';
                    document.querySelector('.mjwi-fls-hide-preview').style.display = 'none';
                }}>❌</span>
                <div className="mjwi-editor-file-full-preview mjwi-hidden"></div>

                <div className="mjwi-editor-display">
                
                    <div
                        data-widget={JSON.stringify({
                            widgetData: widget,
                            serveData: this.state.serveData

                        })}
                        id="mjwi-editor-display-item"
                        className='mj-widget'
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        <h1>Files:</h1>
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

export default Files;
