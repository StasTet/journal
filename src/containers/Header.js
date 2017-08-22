import React, { Component } from 'react';
// import LoginForm from '../containers/LoginForm';
import { Link } from 'react-router-dom';
import Auth from '../modules/authentication';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginFormAction from '../actions/loginFormAction';
import '../style/header.scss';

class Header extends Component {

    setLoginBtn() {
        if (this.props.stateLoginForm.isValid){
            return <div className="login-btn">
                    <Link to="/logout">Log out</Link>
                </div>
        }

        return <div className="login-btn">
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
            </div>

    }

    render() {
        return (
            <div className="header container-fluid">
                <div className="container">
                    <div className="nav-menu col-xs-12 col-md-12 col-lg-12">

                        <div className="top-menu">
                            <Link to="/">Home</Link>
                        </div>

                        {this.setLoginBtn()}

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateLoginForm: state.loginForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginForm: bindActionCreators(loginFormAction, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);