import React, { Component } from 'react';
import Body from '../containers/Body'
import Main from '../containers/Main';
import Header from '../containers/Header';
import Footer from '../containers/Footer';

import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />

                <Body>
                    <Main />
                </Body>

                <Footer />
            </div>
        );
    }
}