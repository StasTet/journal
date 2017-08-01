import React, { Component } from 'react';
import { findIndex } from 'lodash';
import Table from '../containers/Table';
import Header from '../containers/Header';
import Body from '../containers/Body';
import FullInformation from '../containers/FullInformation';
import Footer from '../containers/Footer';

import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class Main extends Component {

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.people.setData();
    }

    onClickHeader(cell) {
        this.props.people.sortData(cell);
    }

    onClickRow(row) {
        this.props.people.showActive(row._id);
    }

    onChangeInput(value) {
        this.props.people.searchData(value.toLowerCase());
    }

    render() {
        const index = findIndex(this.props.state.data, ['active', true])

        return (
            <div>
                <Header 
                    data={this.props.people}
                />
                
                <Body>
                    <FullInformation 
                        data={this.props.state} 
                        index={index} 
                    />
                    <Table 
                        data={this.props.state.data} 
                        onClickHeader={this.onClickHeader.bind(this)} 
                        onClickRow={this.onClickRow.bind(this)}
                        onChangeInput={this.onChangeInput.bind(this)}
                        login={this.props.state.login}
                        state={this.props.people}
                    />
                </Body>

                <Footer />
            </div>
        );
    }
}