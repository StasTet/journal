import React, { Component } from 'react';
import Auth from '../modules/authentication';

export default class LogOut extends Component {

    componentDidMount() {
        Auth.deauthenticateUser();
    }

    render() {
        return (
            <p className="text-success">
                You are logged out
            </p>
        );
    }
}