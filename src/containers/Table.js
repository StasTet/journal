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
    }

    onRow(row) {
        this.row = row;
        this.props.state.form.showEditForm();
    }

    onClickAdditem() {
        this.props.state.form.showAddForm();
    }

    onClickAdditemClose() {
        this.props.state.form.hideAddForm();
    }

    setStateAddForm() {
        this.props.state.form.hideAddForm();
    }

    setStateEditForm() {
        this.props.state.form.hideEditForm();
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

        const renderTable = () => {
            if (this.props.data.length > 0) {
                return <table className="table table-bordered table-striped table-hover table-condensed">
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
            }

            return <p>Journal empty!</p>
        }

        const addItem = () => {
            if (this.props.login && !this.props.stateUserForm.visible_addForm) {
                return <div className="col-lg-12"><input type="button" onClick={this.onClickAdditem.bind(this)} className="btn" value="Add new people" /></div>
            }
        }

        const renderAddForm = () => {
            if (this.props.stateUserForm.visible_addForm) {
                return <AddForm 
                        state={this.props.state.journal}
                        changeState={this.setStateAddForm.bind(this)}
                    />
            }
        }

        const renderEditForm = () => {
            if (this.props.login && this.row != null && this.props.data.length > 0 && this.props.stateUserForm.visible_editForm) {
                return <EditForm 
                        data={this.row} 
                        state={this.props.state.journal} 
                        changeState={this.setStateEditForm.bind(this)} 
                    />
            }
        }

        return (
            <div className="col-xs-12 col-md-6 col-lg-9">
                { renderTable() }
                { addItem() }
                { renderAddForm() }
                { renderEditForm() }
            </div>
        );
    }
}