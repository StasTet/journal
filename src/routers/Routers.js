import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Table from '../components/Table';
import FullInformation from '../components/FullInformation';

export default class Routers extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Table} />
                <Route path="/user/:id" component={FullInformation} />
            </Switch>
        );
    }
}