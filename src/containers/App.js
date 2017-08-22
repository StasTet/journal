import React, { Component } from 'react';
import Body from '../components/Body'
import Main from '../components/Main';
import Header from '../containers/Header';
import Footer from '../components/Footer';

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