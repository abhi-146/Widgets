import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownOpen: false,
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    };

    closeDropdown = () => {
        this.setState({
            isDropdownOpen: false,
        });
    };

    handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    render() {
        const { isDropdownOpen } = this.state;

        let isLoggedIn = false;
        let profileImage = "";
        const user = this.props.user;
        if (Object.keys(user).length != 0) {
            isLoggedIn = true;
            profileImage = decodeURIComponent(this.props.user.profileImage);
        }
        return (
            <div className="mjwi-navbar">
                <div className="mjwi-navbar-title">
                    <span>MJ-Widgets</span>
                </div>
                <div className="mjwi-navbar-links">
                    <Link className="mjwi-nav-link" to="/home"> Home </Link>
                    <Link className="mjwi-nav-link" to="/catalog">
                        Catalog
                    </Link>
                    <Link className="mjwi-nav-link" to="/userPlans">
                        Plans
                    </Link>
                    {
                        (isLoggedIn)
                            ? (
                                <div className="mjwi-nav-link" onClick={this.toggleDropdown}>
                                    <img src={profileImage} className='mjwi-nav-profile-img' />
                                    {isDropdownOpen && (
                                        <div className="mjwi-dropdown-content">
                                            <Link to="/account">
                                            <div className='mjwi-dropdown-item'>
                                                 Profile
                                            </div>
                                            </Link>
                                            <div className='mjwi-dropdown-item'  onClick={this.handleSignOut}>
                                                <span> Sign Out </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                            : (<></>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return (
        {
            user: state.currentUser,
        }
    )
  }
  export default connect(mapStateToProps,null )(Navbar);
