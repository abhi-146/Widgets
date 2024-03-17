import React, { Component } from 'react';
import '../App.css';
import Files from './Files';
import apiInstance from './apiInstance';
import ThreadFeeds from './ThreadFeeds';
import ListingsForAppfolio from './listingsForAppfolio';
import InstallPopup from './InstallPopup';
import ChangePlanPopup from './ChangePlanPopup';
import { connect } from 'react-redux';

class WidgetEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: {
                id: '',
                widgetType: '',
                htmlData: {},
            },
            installPopup: React.createRef(),
            changePlanPopup: React.createRef(),
            error: '',
            msg: '',
            msg_display_status: 'none'
        };
    }

    handleErrorMsgUpdate = (error = '', msg = '') => {
        this.setState((prevState) => {
            return ({
                ...prevState,
                error: error,
                msg: msg,
                msg_display_status: ''
            })
        })

        setTimeout(() => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    msg_display_status: 'none'
                };
            });
        }, 5000);
    }

    componentDidMount() {
        const urlSearchString = window.location.search;
        const params = new URLSearchParams(urlSearchString);
        const widgetID = params.get('widgetId');



        if (widgetID) {
            apiInstance.get(`/widget/` + widgetID)
                .then((response) => {
                    if (response.data.error) {

                    } else {
                        var htmlData = response.data.widget.htmlData

                        if (htmlData.appfolio) {
                            htmlData.appfolio.appfolioUrl = decodeURIComponent(htmlData.appfolio.appfolioUrl)
                            htmlData.appfolio.bedImgUrl = decodeURIComponent(htmlData.appfolio.bedImgUrl)
                            htmlData.appfolio.bathImgUrl = decodeURIComponent(htmlData.appfolio.bathImgUrl)
                        }

                        if (htmlData.threadsFeeds) {
                            htmlData.threadsFeeds.threadsUrl = decodeURIComponent(htmlData.threadsFeeds.threadsUrl)
                        }

                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                widget: response.data.widget,

                            })
                        })

                    }
                })
                .catch((error) => {
                    console.error('Error ', error);
                });
        }

    }


    handleSaveChanges = (widget) => {

        const token = localStorage.getItem("token");
        const { widgetTypes } = this.props;
        let type = '';
        for(const item of widgetTypes) {
            if (item.id === widget.widgetType) {
                type = item.name;
                break; 
            }
        }
    
        let error = "";
        switch (type) {
            case "label":
                if (!widget.htmlData.label.text) {
                    error = "Empty text";
                }
                break;
            case "threadsFeeds":
                if (!widget.htmlData.threadsFeeds.threadsUrl) {
                    error = "Empty url";
                }
                break;
            case "appfolio":
                if (!widget.htmlData.appfolio.appfolioUrl) {
                    error = "Empty url";
                }
                break;
            default:
                break;
        }

        if (error) {
            this.handleErrorMsgUpdate(error, "");
            return;
        } else {
            this.handleErrorMsgUpdate("", "");
        }

        const { id } = this.state.widget;
        const { title, widgetType, htmlData, uploadedFiles, removedFiles, password } = widget;


        var request_body = { widget: { title: title, widgetType: widgetType, htmlData: htmlData, password: password } };

        if (id) {

            apiInstance.put(`/widget/` + id, request_body)
                .then((response) => {
                    if (response.data.error) {

                    } else {
                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                widget: response.data.widget,
                            })
                        })

                        this.handleErrorMsgUpdate("", "Widget updated Successfully!")

                    }
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response) {
                        if (error.response.status == 403) {
                            if (error.response.data.planError) {
                                this.state.changePlanPopup.current.openPopup(error.response.data.planError);
                            } else {
                                window.location.href = "/register"
                            }

                        }
                        else if (error.response.status == 400 && error.response.data.fieldErrors) {

                            this.setState((prevState) => {
                                return ({
                                    ...prevState,
                                    fieldErrors: error.response.data.fieldErrors
                                })
                            })
                        }
                        else {

                            this.setState((prevState) => {
                                return ({
                                    ...prevState,
                                    error: error.response.data
                                })
                            })
                        }
                    } else {
                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                error: error
                            })
                        })
                    }
                });


            // Upload files
            if (type == 'files' && uploadedFiles.length > 0) {
                // Append each file to the FormData
                let allUploadedFiles = Array.from(uploadedFiles);
                this.uploadAllFiles(allUploadedFiles, id)
            }

            // Remove files
            if (type == 'files' && removedFiles.length > 0) {
              let allRemovedFiles = Array.from(removedFiles);
                this.removeAllFiles(allRemovedFiles)
            }

        }
        else {

            apiInstance.post(`/widget/`, request_body)
                .then((response) => {
                    if (response.data.error) {

                    } else {
                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                widget: response.data.widget,
                            })
                        }, async () => {
                            const widgetId = this.state.widget.id;
                            const newUrl = '/editor?widgetId=' + widgetId;

                            // Upload files
                            if (type == 'files' && uploadedFiles.length > 0) {
                                // Append each file to the FormData
                                let allUploadedFiles = Array.from(uploadedFiles);
                                await this.uploadAllFiles(allUploadedFiles, widgetId)
                            }

                            window.location.replace(newUrl);
                        });
                        this.handleErrorMsgUpdate("", "Widget added Successfully!")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response) {
                        if (error.response.status == 403) {
                            if (error.response.data.planError) {
                                this.state.changePlanPopup.current.openPopup(error.response.data.planError);
                            } else {
                                window.location.href = "/register"
                            }

                        }
                        else if (error.response.status == 400 && error.response.data.fieldErrors) {

                            this.setState((prevState) => {
                                return ({
                                    ...prevState,
                                    fieldErrors: error.response.data.fieldErrors
                                })
                            })
                        }
                        else {

                            this.setState((prevState) => {
                                return ({
                                    ...prevState,
                                    error: error.response.data
                                })
                            })
                        }
                    } else {
                        this.setState((prevState) => {
                            return ({
                                ...prevState,
                                error: error
                            })
                        })
                    }
                });
        }
    }

    uploadFile = async (file, index, widgetId) => {
        var formData = new FormData();
        formData.append(`file`, file);
        formData.append(`widgetId`, widgetId);

        await apiInstance.post(`/widget/file/`, formData)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log("Error at: " + index + " " + error)
            })
    }

    uploadAllFiles = async (allUploadedFiles, widgetId) => {
        // Array.from(uploadedFiles).forEach(await (file, index) => {this.uploadFile(file, index)});

        for(let i = 0; i<allUploadedFiles.length; i++) {
            await this.uploadFile(allUploadedFiles[i], i, widgetId);
        }
    }


    removeFile = async (file, index) => {

      await apiInstance.delete(`/widget/file/` + file)
          .then((response) => {
              console.log(response)
          })
          .catch((error) => {
              console.log("Error at: " + index + " " + error)
          })
  }

  removeAllFiles = async (allRemovedFiles) => {
      for(let i = 0; i<allRemovedFiles.length; i++) {
          await this.removeFile(allRemovedFiles[i], i);
      }
  }

    handleShowInstallPopup = () => {
        this.state.installPopup.current.openPopup(this.state.widget.id);
    };

    handleCopyText = () => {
        const range = document.createRange();
        range.selectNodeContents(this.popupRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };



    render() {

        const { widget, installPopup, changePlanPopup } = this.state;
        let { widgetType } = widget;
        let type = '';
        if (!widgetType) {
            const urlSearchString = window.location.search;
            const params = new URLSearchParams(urlSearchString);
            const typeId = params.get('widgetType');
            const { widgetTypes } = this.props;

            for (const widget of widgetTypes) {
                if (widget.id === typeId) {
                    type = widget.name;
                    break; 
                }
            }

        } else {
            type = widgetType.name;
        }

       


        return (
            <div className="mjwi-editor-wrapper">
                <div style={{ display: this.state.msg_display_status }} className='chkr-msg-wrapper'>
                    <div className={'mjwi-error-main' + (this.state.error ? '' : ' mjwi-hidden')}>{this.state.error}</div>
                    <div className={'mjwi-msg-main' + (this.state.msg ? '' : ' mjwi-hidden')}>{this.state.msg}</div>
                </div>
                <div className="mjwi-editor-content">
                    {type === "threadsFeeds" && (
                        <ThreadFeeds
                            widget={this.state.widget}
                            handleSaveChanges={this.handleSaveChanges}
                            handleInstall={this.handleShowInstallPopup}
                        />
                    )}
                    {type === "appfolio" && (
                        <ListingsForAppfolio
                            widget={this.state.widget}
                            handleSaveChanges={this.handleSaveChanges}
                            handleInstall={this.handleShowInstallPopup}
                        />
                    )}
                    {type === "files" && (
                        <Files
                            widget={this.state.widget}
                            handleSaveChanges={this.handleSaveChanges}
                            handleInstall={this.handleShowInstallPopup}
                        />
                    )}
                </div>
                <InstallPopup ref={installPopup} />

                <ChangePlanPopup ref={changePlanPopup} />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return (
        {
            widgetTypes: state.widgetTypes,
        }
    )
  }

  export default connect(mapStateToProps,null )(WidgetEditor);
  
