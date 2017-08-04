import React, { Component } from 'react';
import '../style/footer.scss'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer container-fluid">
                <div className="container">
                    <p className="copyright">Copyright © 2017</p>
                </div>
            </div>
        );
    }
}