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
            editPanel: false,
            addBtn: true,
            delBtn: true
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
            addPanel: true,
            addBtn: false
        })
    }

    onClickAdditemClose() {
        this.setState({
            addPanel: false,
            addBtn: true
        })
    }

    localState() {
        this.setState({
            addPanel: false,
            editPanel: false,
            addBtn: true,
            delBtn: false
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

        const bodyTable = this.props.data.map((row) =>{
            if (row.visible) {
                return (
                    <tr key={row._id} onClick={() => {this.props.onClickRow(row);this.onRow(row)}} className={(row.active) ? 'info' : 'not-active'}>
                        {
                            Object.keys(row).filter(item => this.showRows.indexOf(item) !== -1).map((cell) => {
                                return <td key={row._id + '' + cell}>{row[cell]}</td>
                            })
                        }
                    </tr>
                )
            }
        });

        const addItem = () => {
            if (this.props.login && this.state.addBtn) {
                return <div className="col-lg-12"><button onClick={this.onClickAdditem.bind(this)} className="btn">Add new people</button></div>
            }
            if (this.props.login) {
                return <div className="col-lg-12"><button onClick={this.onClickAdditemClose.bind(this)} className="btn">Close</button></div>
            }
            
        }

        return (
            <div className="container row col-lg-9 ">
                {
                    (this.props.data.length > 0)
                    ?   <table className="table table-bordered table-striped table-hover table-condensed">
                            <thead>
                                <tr>
                                    <td colSpan="5" className="panel-heading">
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
                            <tbody>{bodyTable}</tbody>
                        </table>

                    :   <p>Journal empty!</p>
                }


                {
                    addItem()
                }

                {
                    (this.state.addPanel) && 
                        <AddForm 
                            state={this.props.state}
                            localState={this.localState.bind(this)}
                        />
                }

                {
                    (this.props.login && this.row != null && this.state.editPanel && this.props.data.length > 0) && 
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