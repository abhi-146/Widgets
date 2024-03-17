import React, { Component } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import InfoPopup from './InfoPopup';
import VerifyPassPopup from './verifyPassPopup';
import PurchasePopup from './PurchasePopup';
import EditorLeftbar from './EditorLeftbar';
import handlePreviewHtml from './WidgetPreviewHandler';

class ListingsForAppfolio extends Component {
    constructor(props) {
        super(props);

        const { widget } = props;
        const { id, htmlData, title, password, widgetType, isPro } = widget;
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
                isPro: isPro ? isPro : false,
                widgetType: widgetType?.id || typeId,
                id: id || '',
                title: title || 'Appfolio',
                password: password || '',
                htmlData: {

                    appfolio: {
                        appfolioUrl: decodeURIComponent(htmlData?.appfolio?.appfolioUrl || ''),
                        appfolioHeading: htmlData?.appfolio?.appfolioHeading || '',
                        appfolioTemplate: htmlData?.appfolio?.appfolioTemplate || 'eagle',
                        appfolioDisplayFilters: {
                            search: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.search : true,
                            cats: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.cats : true,
                            dogs: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.dogs : true,
                            minRent: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.minRent : true,
                            maxRent: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.maxRent : true,
                            beds: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.beds : true,
                            baths: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.baths : true,
                            cities: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.cities : true,
                            zip: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.zip : true,
                            desiredMoveIn: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.desiredMoveIn : true,
                            sorting: htmlData.appfolio ? htmlData.appfolio.appfolioDisplayFilters.sorting : true,
                        },
                        appfolioSortOrder: htmlData?.appfolio?.appfolioSortOrder || 'rent_asc',
                        searchBtnText: htmlData?.appfolio?.searchBtnText || '',
                        searchBtnBg: htmlData?.appfolio?.searchBtnBg || '',
                        appfolioCol: htmlData?.appfolio?.appfolioCol || '3',
                        appfolioRentText: htmlData?.appfolio?.appfolioRentText || 'RENT',
                        displayBeds: htmlData.appfolio ? htmlData.appfolio.displayBeds : true,
                        bedImgUrl: decodeURIComponent(htmlData?.appfolio?.bedImgUrl || 'http://localhost:3000/images/bed.png'),
                        displayBath: htmlData.appfolio ? htmlData.appfolio.displayBath : true,
                        bathImgUrl: decodeURIComponent(htmlData?.appfolio?.bathImgUrl || 'http://localhost:3000/images/bath.png'),
                        priceTagImgUrl: decodeURIComponent(htmlData?.appfolio?.priceTagImgUrl || 'http://localhost:3000/images/dollar-tag.png'),
                        phoneImgUrl: decodeURIComponent(htmlData?.appfolio?.phoneImgUrl || 'http://localhost:3000/images/phone-call.png'),
                        checkImgUrl: decodeURIComponent(htmlData?.appfolio?.checkImgUrl || 'http://localhost:3000/images/check.png'),
                        height: htmlData?.appfolio?.height || 100,
                        width: htmlData?.appfolio?.width || 100,
                        template: htmlData?.appfolio?.template || 'eagle',
                        clientGmapApi: htmlData?.appfolio?.clientGmapApi || '',
                    }
                }
            },
            previewHtml: '',
            error: "",

            fieldErrors: "",
            infoPopup: React.createRef(),
            verifyPassPopup: React.createRef(),
            purchasePopup: React.createRef(),
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

    handlePasswordChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            password: value,

        }));
    }

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
                    appfolio: {
                        ...prevState.widget.htmlData.appfolio,
                        [name]: value,
                    },
                },
            },
        }));
    };


    handleFilterCheckboxChange = (e) => {
        const { name, checked } = e.target;

        this.setState((prevState) => ({
            widget: {
                ...prevState.widget,
                htmlData: {
                    ...prevState.widget.htmlData,
                    appfolio: {
                        ...prevState.widget.htmlData.appfolio,
                        appfolioDisplayFilters: {
                            ...prevState.widget.htmlData.appfolio.appfolioDisplayFilters,
                            [name]: checked,
                        },
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
                    appfolio: {
                        ...prevState.widget.htmlData.appfolio,
                        [name]: checked,
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

        if(!widget.htmlData.appfolio.appfolioUrl){
            this.setState((prevState) => ({
                ...prevState,
                error: "Empty Url",
                previewHtml: ''
            }));
            return;
        }

        if(!widget.isPro) {
            this.state.purchasePopup.current.openPopup(widget);
            return;
        }

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

    previewWidget = async () => {
       
        if (this.state.widget.password != "" && !this.state.passwordVerified) {
            this.setState({ previewHtml: '' });
            this.state.verifyPassPopup.current.openPopup(this.state.widget.password);
            return;
        }
        this.setState({ previewHtml: '<div>Loading...</div>' });

        const data = await handlePreviewHtml(this.state.widget, this.state.password);

        if (data.error) {
            this.setState((prevState) => ({
                ...prevState,
                error: data.error,
                previewHtml: ''
            }));
        } else if (data.fieldErrors) {
            this.setState((prevState) => ({
                ...prevState,
                fieldErrors: data.fieldErrors,
                previewHtml: ''
            }));
        } else if (data.previewHtml) {
            this.setState((prevState) => ({
                ...prevState,
                previewHtml: data.previewHtml
            }));
        }

    };

    render() {

  
        const { selectedEditor, widget, previewHtml } = this.state;

        const { title, password } = widget
        const { appfolio } = widget.htmlData
        const gApiSteps = `
        <h2>Step-by-Step Guide to Add Your Domain to Allowed Referrers:</h2>
        <ol>
        <li>Go to the Google Cloud Console: Navigate to the Google Cloud Console.
        <li>Select Your Project: Make sure you have the correct project selected from the project dropdown menu at the top of the page.
        <li>Access API & Services: Click on the "Navigation Menu" (three horizontal lines in the top-left corner), then select "APIs & Services" > "Credentials."
        <li>Identify Your API Key: In the "Credentials" page, you will see a list of API keys. Find the API key you are using for the Maps JavaScript API.
        <li>Edit API Key: Click on the name of your API key to edit its settings.
        <li>Application Restrictions: Scroll down to the "Application restrictions" section. Select "HTTP referrers (websites)" to restrict the usage of the API key to specific websites.
        <li>Add Your Domain: Under "Website restrictions," click "Add an item" and enter your domain in the format specified (e.g., example.com/* for a broad match or https://www.example.com/specificpage for a more specific path).
        <li>Note: Ensure you include all variations of your domain that your application might use, including with or without www, different subdomains, or any specific paths, if applicable.
        <li>Save Changes: After adding your domain(s), click the "Save" button at the bottom of the page to apply your changes.
        </ol>
        `;

        return (
            <div className="mjwi-editor">
                <div className={'mjwi-error-main' + (this.state.error ? '' : ' mjwi-hidden')}>{this.state.error}</div>
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
                            <label htmlFor="appfolioUrl">Enter profile url:</label>
                            <input
                                type="text"
                                name="appfolioUrl"
                                value={appfolio.appfolioUrl}
                                placeholder="https://dkmgmt.appfolio.com/listings"
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="clientGmapApi">Enter google map api: <FontAwesomeIcon onClick={() => this.state.infoPopup.current.openPopup()} icon={faCircleInfo} /></label>
                            <input
                                type="text"
                                name="clientGmapApi"
                                value={appfolio.clientGmapApi}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    )}

                    {selectedEditor === 'Layout' && (
                        <div className="mjwi-editor-layout">

                            <label htmlFor="height">Height(vh):</label>
                            <input
                                type="Number"
                                name="height"
                                value={appfolio.height}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="width">Width(%):</label>
                            <input
                                type="Number"
                                name="width"
                                value={appfolio.width}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="template">Template:</label>
                            <select
                                id="template"
                                name="template"
                                value={appfolio.template}
                                onChange={this.handleInputChange}
                            >
                                <option value='eagle'>Eagle</option>
                                <option value='hawk'>Hawk</option>
                            </select>

                            <label htmlFor="appfolioHeading">Heading:</label>
                            <input
                                type="text"
                                name="appfolioHeading"
                                value={appfolio.appfolioHeading}
                                onChange={this.handleInputChange}
                            />
                            <div className="mjwi-apfl-display-filters">
                                <span> Display filters </span>
                                <label htmlFor="search">Search:</label>
                                <input
                                    type="checkbox"
                                    name="search"
                                    checked={appfolio.appfolioDisplayFilters.search}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="cats">Cats:</label>
                                <input
                                    type="checkbox"
                                    name="cats"
                                    checked={appfolio.appfolioDisplayFilters.cats}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="dogs">Dogs:</label>
                                <input
                                    type="checkbox"
                                    name="dogs"
                                    checked={appfolio.appfolioDisplayFilters.dogs}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="minRent">Min Rent:</label>
                                <input
                                    type="checkbox"
                                    name="minRent"
                                    checked={appfolio.appfolioDisplayFilters.minRent}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="maxRent">Max Rent:</label>
                                <input
                                    type="checkbox"
                                    name="maxRent"
                                    checked={appfolio.appfolioDisplayFilters.maxRent}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="beds">Beds:</label>
                                <input
                                    type="checkbox"
                                    name="beds"
                                    checked={appfolio.appfolioDisplayFilters.beds}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="baths">Baths:</label>
                                <input
                                    type="checkbox"
                                    name="baths"
                                    checked={appfolio.appfolioDisplayFilters.baths}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="cities">Cities:</label>
                                <input
                                    type="checkbox"
                                    name="cities"
                                    checked={appfolio.appfolioDisplayFilters.cities}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="zip">ZIP:</label>
                                <input
                                    type="checkbox"
                                    name="zip"
                                    checked={appfolio.appfolioDisplayFilters.zip}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="desiredMoveIn">Desired Move-In:</label>
                                <input
                                    type="checkbox"
                                    name="desiredMoveIn"
                                    checked={appfolio.appfolioDisplayFilters.desiredMoveIn}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                                <label htmlFor="sorting">Sorting:</label>
                                <input
                                    type="checkbox"
                                    name="sorting"
                                    checked={appfolio.appfolioDisplayFilters.sorting}
                                    onChange={this.handleFilterCheckboxChange}
                                />

                            </div>
                            <label htmlFor="appfolioSortOrder">Sort order:</label>
                            <select
                                id="appfolioSortOrder"
                                name="appfolioSortOrder"
                                value={appfolio.appfolioSortOrder}
                                onChange={this.handleInputChange}
                            >
                                <option value="date_posted">Most Recent</option>
                                <option value="rent_asc">Rent (Low to High)</option>
                                <option value="rent_desc">Rent (High to Low)</option>
                                <option value="bedrooms_asc">Bedrooms (ASC)</option>
                                <option value="bedrooms_desc">Bedrooms (DESC)</option>
                                <option value="availability">Availability</option>
                            </select>

                            <label htmlFor="appfolioCol">Listings page layout:</label>
                            <select
                                id="appfolioCol"
                                name="appfolioCol"
                                value={appfolio.appfolioCol}
                                onChange={this.handleInputChange}
                            >
                                <option value="1">1 column</option>
                                <option value="2">2 columns</option>
                                <option value="3">3 columns</option>
                                <option value="4">4 columns</option>
                                <option value="5">5 columns</option>
                            </select>


                            <label htmlFor="appfolioRentText">Rent text:</label>
                            <input
                                type="text"
                                name="appfolioRentText"
                                value={appfolio.appfolioRentText}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="displayBeds">Display Beds:</label>
                            <input
                                type="checkbox"
                                name="displayBeds"
                                checked={appfolio.displayBeds}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="bedImgUrl">Image URL:</label>
                            <input
                                type="text"
                                name="bedImgUrl"
                                value={appfolio.bedImgUrl}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="displayBath">Display Bath:</label>
                            <input
                                type="checkbox"
                                name="displayBath"
                                checked={appfolio.displayBath}
                                onChange={this.handleCheckboxChange}
                            />

                            <label htmlFor="bathImgUrl">Image URL:</label>
                            <input
                                type="text"
                                name="bathImgUrl"
                                value={appfolio.bathImgUrl}
                                onChange={this.handleInputChange}
                            />

                            <label htmlFor="priceTagImgUrl">Price tag image URL:</label>
                            <input
                                type="text"
                                name="priceTagImgUrl"
                                value={appfolio.priceTagImgUrl}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="phoneImgUrl">Phone image URL:</label>
                            <input
                                type="text"
                                name="phoneImgUrl"
                                value={appfolio.phoneImgUrl}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkImgUrl">Check image URL:</label>
                            <input
                                type="text"
                                name="checkImgUrl"
                                value={appfolio.checkImgUrl}
                                onChange={this.handleInputChange}
                            />


                        </div>
                    )}
                    <Button name="Save" eventHandler={this.handleSaveHTML} />
                    <Button name="Preview" eventHandler={this.previewWidgetOnClick} />
                </div>
                <div className=" mjwi-editor-display">
                    <div
                        data-widget={JSON.stringify({ widgetData: widget })}
                        className="mj-widget"
                        id="mjwi-appfolio-preview"
                        style={{
                            marginTop: '20px',
                        }}
                    >

                        {previewHtml && (
                            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                        )}
                    </div>
                </div>
                <InfoPopup ref={this.state.infoPopup} info={gApiSteps} />
                <VerifyPassPopup ref={this.state.verifyPassPopup} updateVerifyPassState={this.updateVerifyPassState} />
                <PurchasePopup ref={this.state.purchasePopup} />
            </div>
        );
    }
}

export default ListingsForAppfolio;
