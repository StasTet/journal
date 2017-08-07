import React, { Component } from 'react';
// import LoginForm from '../containers/LoginForm';
import { Link } from 'react-router-dom';
import Auth from '../modules/authentication';
import '../style/header.scss';

export default class Header extends Component {

    render() {
        return (
            <div className="header container-fluid">
                <div className="container">
                    {/* <LoginForm /> */}
                    <div className="nav-menu col-xs-12 col-md-12 col-lg-12">

                        <div className="top-menu">
                            <Link to="/">Home</Link>
                        </div>

                            {
                                Auth.isUserAuthenticated() ? (
                                    <div className="login-btn">
                                        <Link to="/logout">Log out</Link>
                                    </div>
                                ) : (
                                    <div className="login-btn">
                                        <Link to="/login">Log in</Link>
                                        <Link to="/signup">Sign up</Link>
                                    </div>
                                )
                            }
                            
                    </div>
                </div>
            </div>
        );
    }
}