import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Table from '../containers/Table';
import FullInformation from '../containers/FullInformation';

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