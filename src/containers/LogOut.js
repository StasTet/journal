import React, { Component } from 'react';
import Auth from '../modules/authentication';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginFormAction from '../actions/loginFormAction';

class LogOut extends Component {

    componentDidMount() {
        Auth.deauthenticateUser();
        this.props.loginForm.logOut();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.stateLoginForm.isValid) {
            setTimeout(() => {
                this.props.history.push('/');
            }, 2000);
        }
    }

    render() {
        return (
            <p className="text-success">
                You are logged out
            </p>
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


export default connect(mapStateToProps, mapDispatchToProps)(LogOut);