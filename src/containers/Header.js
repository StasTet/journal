import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import '../style/header.scss';

export default class Header extends Component {

    render() {
        return (
            <div className="header container-fluid">
                <div className="container">
                    <LoginForm />
                </div>
            </div>
        );
    }
}