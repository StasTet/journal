import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import DeleteButton from '../containers/DeleteButton';


// import AddForm from '../containers/AddForm';
import Form from '../containers/Form';


import * as journalAction from '../actions/journalAction';
import * as formAction from '../actions/formAction';
import '../style/table.scss';

class Table extends Component {
    constructor(props) {
        super(props);

        this.showRows = ['name', 'surname', 'age', 'phone', 'mark']

        this.row = null;
    }

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
        this.row = row;
        this.props.form.showEditForm();
        this.props.journal.showActive(row._id);
    }

    onChangeInput(e) {
        this.props.journal.searchData(e.target.value.toLowerCase());
    }

    onClickAdditem() {
        this.props.form.showAddForm();
    }

    onClickAdditemClose() {
        this.props.form.hideAddForm();
    }

    setStateAddForm() {
        this.props.form.hideAddForm();
    }

    setStateDelBtn() {
        this.props.form.hideEditForm();
    }

    formSubmitHandler(values) {
        const data = {
            name : values.name,
            surname: values.surname,
            age: values.age,
            phone: values.phone,
            mark: values.mark,
            active: false,
            visible: true
        }

        this.props.journal.addItem(data);
        this.setStateAddForm();
    }

    render() {
        const headTable = this.props.stateJournal.data.map((item, index) => {
            if (index == 0) {
                return (
                    <tr key={uniqueId()}>
                        {
                            Object.keys(this.props.stateJournal.data[0]).filter(item => this.showRows.indexOf(item) !== -1).map((cell) => {
                                return <th key={uniqueId()} onClick={this.onClickHeader.bind(this, cell)}>{cell}</th>
                            })
                        }
                    </tr>
                )
            }
        });

        const bodyTable = this.props.stateJournal.data.map((row) =>{
            if (row.visible) {
                return (
                    <tr key={row._id} onClick={this.onClickRow.bind(this, row)} className={(row.active) ? 'info' : 'not-active'}>
                        {
                            Object.keys(row).filter(item => this.showRows.indexOf(item) !== -1).map((cell) => {
                                return <td key={row._id + '' + cell}><Link to={`/user/${row._id}`}>{row[cell]}</Link></td>
                            })
                        }
                    </tr>
                )
            }
        });

        const renderTable = () => {
            if (this.props.stateJournal.data.length > 0) {
                return <table className="table table-bordered table-striped table-hover table-condensed">
                            <thead>
                                <tr>
                                    <td colSpan="5" className="panel-heading">
                                        <input 
                                            type="text"
                                            placeholder="Search people by surname"
                                            className="search"
                                            ref={input => this.textInput = input}
                                            onChange={this.onChangeInput.bind(this)}
                                        />
                                    </td>
                                </tr>
                                {headTable}
                            </thead>
                            <tbody>{bodyTable}</tbody>
                        </table>
            }

            if (this.props.stateJournal.loading) {
                return <p>Loading..</p>
            }

            return <p>Journal empty!</p>
        }

        const addItem = () => {
            if (this.props.stateJournal.login && !this.props.stateForm.visible_addForm) {
                return <div className="col-lg-12"><input type="button" onClick={this.onClickAdditem.bind(this)} className="btn" value="Add new people" /></div>
            }
        }

        const renderAddForm = () => {
            if (this.props.stateForm.visible_addForm) {
                return <Form
                            state={this.props.journal}
                            changeState={this.setStateAddForm.bind(this)}
                            formSubmitHandler={this.formSubmitHandler.bind(this)}
                            form="addForm"
                        />
                // return <AddForm
                //             state={this.props.journal}
                //             changeState={this.setStateAddForm.bind(this)}
                //             formSubmitHandler={this.formSubmitHandler.bind(this)}
                //         />
            }
        }

        const renderEditForm = () => {
            if (this.props.stateJournal.login && this.row != null && this.props.stateJournal.data.length > 0 && this.props.stateForm.visible_deleteBtn) {
                return <DeleteButton
                            data={this.row} 
                            state={this.props.journal} 
                            changeState={this.setStateDelBtn.bind(this)} 
                        />
            }
        }

        return (
            <div className="col-xs-12 col-md-12 col-lg-12">
                { renderTable() }
                { addItem() }
                { renderAddForm() }
                { renderEditForm() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateJournal: state.journal,
        stateForm: state.userForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        journal: bindActionCreators(journalAction, dispatch),
        form: bindActionCreators(formAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);