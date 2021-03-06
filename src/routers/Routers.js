import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Table from '../containers/Table';
import FullInformation from '../containers/FullInformation';
import LoginForm from '../containers/LoginForm';
import SignUpForm from '../containers/SignUpForm';
import LogOut from '../containers/LogOut';
// import Auth from '../modules/authentication';

export default class Routers extends Component {

    render() {
        return (
            <Switch>
                <Route path="/" exact component={Table} />
                <Route path="/user/:id" component={FullInformation} />
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={SignUpForm} />
                <Route path="/logout" component={LogOut} />
            </Switch>
        );
    }
}