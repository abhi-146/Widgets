import React, { Component } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import apiInstance from './apiInstance';
import InstallPopup from './InstallPopup';
import DeletePopup from './DeletePopup';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            deletePopup: React.createRef(),
            installPopup: React.createRef()
        };
    }

    componentDidMount() {

        apiInstance.get('/widget/')
            .then(response => {
                this.setState({ widgets: response.data });
                console.log(response.data )
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    deleteWidget = (widgetId) => {
        let updatedWidgets = this.state.widgets.filter((widget) => widget.id !== widgetId);

        this.setState((prevState) => {
            return({
                ...prevState,
                widgets: updatedWidgets
            })
        })
    }

    render() {
        let { widgets, deletePopup, installPopup } = this.state;
        return (
            <>
                <div className="mjwi-widget-list">
                <div className='mjwi-add-widget-btn'><Link to="/catalog">Add widget</Link></div>
                    {widgets.map(widget => (
                        <div key={widget.id} className="mjwi-widget-container">
                            <span className="mjwi-widget-title">
                                {widget.title}
                            </span>
                            <span className="mjwi-widget-text">
                                {widget.text}
                            </span>
                            <Link to={`/editor?widgetId=${widget.id}`}>Edit</Link>
                            <Button name="Install" eventHandler={() => {installPopup.current.openPopup(widget.id)}} />
                            <Button name="Delete" eventHandler={() => {deletePopup.current.openPopup(widget.id)}} />
                        </div>
                    ))}
                </div>
                <DeletePopup ref={deletePopup} deleteWidgetHandler = {this.deleteWidget}/>
                <InstallPopup ref={installPopup}/>
            </>
        );
    }
}


export default Widget;
