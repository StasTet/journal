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
        this.props.journal.setData();
    }

    onClickHeader(cell) {
        this.props.journal.sortData(cell);
    }

    onClickRow(row) {
        this.props.journal.showActive(row._id);
    }

    onChangeInput(value) {
        this.props.journal.searchData(value.toLowerCase());
    }

    render() {
        const index = findIndex(this.props.stateJournal.data, ['active', true])

        return (
            <div>
                <Header 
                    data={this.props.journal}
                />
                
                <Body>
                    <FullInformation 
                        data={this.props.stateJournal} 
                        index={index} 
                    />
                    <Table 
                        data={this.props.stateJournal.data} 
                        onClickHeader={this.onClickHeader.bind(this)} 
                        onClickRow={this.onClickRow.bind(this)}
                        onChangeInput={this.onChangeInput.bind(this)}
                        login={this.props.stateJournal.login}
                        state={this.props}
                        stateUserForm={this.props.stateForm}
                    />
                </Body>

                <Footer />
            </div>
        );
    }
}