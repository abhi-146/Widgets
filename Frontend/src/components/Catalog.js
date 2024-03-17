import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import apiInstance from './apiInstance';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: [],
      categories: ['All widgets', 'label', 'threadsFeeds', 'Forms', 'Files'],
      selectedCategory: 'All widgets',
      searchQuery: '',
      error: '',
    };
  }

  componentDidMount() {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const widgetId = params.get('widgetId');
    if(widgetId){
      apiInstance.delete(`/widget/${widgetId}`)
      .then(response => {
        console.log(response)
        
      })
      .catch(error => {
          console.error('Error deleting the widget:', error);
      });
    }
   
    const urlWithoutParams = (window.location.href).split('?')[0];
    window.history.pushState({}, 'title', urlWithoutParams)
  }

  updateErrorMessage = (error = "", msg = "") => {
    this.setState((prevState) => {
        return ({
            ...prevState,
            error: error,
            msg: msg
        })
    })
}

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { categories, searchQuery, selectedCategory, error } = this.state;

    const widgets = (this.props.widgetTypes)
    const filteredWidgets = widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All widgets' || widget.category === selectedCategory)
    );

    return (
      <div className="mjwi-ct-container">
        <div className="mjwi-ct-menu">
          <h3 className="mjwi-ct-menu__title">Categories</h3>
          <ul className="mjwi-ct-menu__list">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`mjwi-ct-menu__item ${selectedCategory === category ? 'mjwi-active' : ''}`}
                onClick={() => this.handleCategoryChange(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="mjwi-ct-content">
          <div className="mjwi-ct-search">
            <input
              type="text"
              id="searchInput"
              value={searchQuery}
              placeholder="What are you looking for?"
              onChange={this.handleSearchChange}
            />
          </div>
          <div className="mjwi-ct-list">
            {filteredWidgets.map(widget => (
              <div className="mjwi-ct-card" key={widget.id}>
                <h3 className="mjwi-ct-card__title">
                  <Link to={`/editor?widgetType=${widget.id}`}>{widget.name}</Link>
                </h3>
                <p className="mjwi-ct-card__content">{widget.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={'mjwi-error' + (error ? '' : ' mjwi-hidden')}>{error}</div>
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

export default connect(mapStateToProps,null )(Catalog);