import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import EditForm from './EditForm';
import AddForm from './AddForm';
import '../style/table.scss';

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.showRows = ['name', 'surname', 'age', 'phone', 'mark']

        this.row = null;

        this.state = {
            addPanel: false,
            editPanel: false
        }
    }

    onRow(row) {
        this.setState({
            editPanel: true
        })
        this.row = row;
    }

    onClickAdditem() {
        this.setState({
            addPanel: true
        })
    }

    localState() {
        this.setState({
            addPanel: false,
            editPanel: false
        })
    }

    render() {
        const headTable = this.props.data.map((item, index) => {
            if (index == 0) {
                return (
                    <tr key={uniqueId()}>
                        {
                            Object.keys(this.props.data[0]).filter(item => this.showRows.indexOf(item) !== -1).map((cell) => {
                                return <th key={uniqueId()} onClick={() => this.props.onClickHeader(cell)}>{cell}</th>
                            })
                        }
                    </tr>
                )
            }
        });
        
        const table = this.props.data.map((row) =>{
            if (row.visible) {
                return (
                    <tr key={row._id} onClick={() => {this.props.onClickRow(row);this.onRow(row)}}>
                        {
                            Object.keys(row).filter(item => this.showRows.indexOf(item) !== -1).map((cell) => {
                                return <td key={row._id + '' + cell}>{row[cell]}</td>
                            })
                        }
                    </tr>
                )
            }
        });

        return (
            <div className="table">
                <table>
                     <thead>
                        <tr>
                            <td colSpan="5">
                                <input 
                                    type="text"
                                    placeholder="Search people by surname"
                                    className="search"
                                    ref={input => this.textInput = input} 
                                    onChange={() => this.props.onChangeInput(this.textInput.value)}
                                />
                            </td>
                        </tr>
                        {headTable}
                    </thead>
                    <tbody>{table}</tbody>
                </table>

                {
                    (this.props.login) && <p><button onClick={this.onClickAdditem.bind(this)}>Add new people</button></p>
                }

                {
                    (this.state.addPanel) && 
                    <AddForm 
                        state={this.props.state} 
                        localState={this.localState.bind(this)}
                    />
                }

                {
                    (this.props.login && this.row != null && this.state.editPanel) && 
                    <EditForm 
                        data={this.row} 
                        state={this.props.state} 
                        localState={this.localState.bind(this)} 
                    />
                }
            </div>
        );
    }
}