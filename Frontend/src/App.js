import React, { Component } from 'react';
import './assets/css/style.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Account from './components/Account';
import Navbar from './components/Navbar';
import WidgetEditor from './components/WidgetEditor';
import Register from './components/Register';
import apiInstance from './components/apiInstance';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './components/ResetPassword';
import { changeOverlayStatus } from './state/actionCreators/index'
import { connect } from 'react-redux';
import UserPlans from './components/UserPlans';
import {changeCurrentUser} from './state/actionCreators/index'
import {changeWidgetTypes} from './state/actionCreators/index'


class App extends Component {
    constructor(props) {
    
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

    apiInstance.get('/')
      .then((response) => {
        this.props.changeCurrentUser(response.data.user)
        this.props.changeWidgetTypes(response.data.widgetTypes)
        console.log(response.data.widgetTypes)
      })
      .catch((error) => {
        console.error('Error ', error);
      });

  
  }

  render() {
    // const { isLoggedIn, user } = this.state;
    let isLoggedIn = false;
    const user = this.props.user;
    if (Object.keys(user).length != 0) {
        isLoggedIn = true;
    }

    return (
      <>
        <div className="App">
        <div className={(this.props.overlay == 'true') ? "mjwi-overlay" : "mjwi-hidden"}></div>
          <Router><Navbar />

            {isLoggedIn ?

              <Routes>
                <Route path="/resetPassword" element={<Navigate to="/home" />} />
                <Route exact path="/" element={<Navigate to="/home" />} />
                <Route path="/register" element={<Navigate to="/home" />} />
                <Route path="/account" element={<Account />} />
                <Route path="/abc" element={<Account />} />
              </Routes>

              :
              <Routes>
                 <Route path="/abc"  element={<Navigate to="/register" />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/account" element={<Navigate to="/register" />} />
                <Route path="/" element={<Register/>} />
                <Route path="/register" element={<Register />} />
              </Routes>
            }

            <Routes>
              <Route
                path="/home"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Home />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="/account"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <Account />
                  </PrivateRoute>
                }
              /> */}
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/editor" element={<WidgetEditor />} />
              <Route path="/userPlans" element={<UserPlans />} />
            </Routes>

          </Router>
        </div>
      </>

    );
  }
}

const mapStateToProps = (state) => {
  return (
      {
          overlay: state.overlay,
          user: state.currentUser,
          widgetTypes: state.widgetTypes,
      }
  )
}

const mapDispatchToProps = (dispatch) => {
  return (
      {
          changeOverlayStatus: (status) => {dispatch(changeOverlayStatus(status))},
          changeCurrentUser: (user) => {dispatch(changeCurrentUser(user))},
          changeWidgetTypes: (widgetTypes) => {dispatch(changeWidgetTypes(widgetTypes))},
      }
  )
}

export default connect(mapStateToProps,mapDispatchToProps )(App);
