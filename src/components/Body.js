import React, { Component } from 'react';
import '../style/container.scss'

export default class Body extends Component {
    render() {
        return (
            <div className="container main-container">
                {this.props.children}
            </div>
        );
    }
}