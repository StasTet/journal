import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../components/DeleteButton';
import Form from '../components/Form';
// import Auth from '../modules/authentication';
import * as journalAction from '../actions/journalAction';
import * as formAction from '../actions/formAction';
import * as loginFormAction from '../actions/loginFormAction';
import '../style/table.scss';

class Table extends Component {
    constructor(props) {
        super(props);

        this.showRows = ['name', 'surname', 'age', 'phone', 'mark']

        this.row = null;
    }

    componentDidMount() {
        // this.props.journal.setAuthorization();
        // console.log(this.props.journal.setAuthorization())
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.stateLoginForm.isValid) {
            setTimeout(() => {
                this.props.history.push('/login');
            }, 0);
        }
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

    searchInput(e) {
        this.props.journal.searchData(e.target.value.toLowerCase());
    }

    onClickAdditem() {
        this.props.form.showAddForm();
    }

    setStateForm() {
        this.props.form.hideAddForm();
    }

    setStateDelBtn() {
        this.props.form.hideEditForm();
    }

    onHandlerDelete(id) {
        this.props.journal.delItem(id);
        this.setStateDelBtn();
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
        this.setStateForm();
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
                                            onChange={this.searchInput.bind(this)}
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
            if (this.props.stateLoginForm.isValid && !this.props.stateForm.visible_addForm) {
                return <input type="button" onClick={this.onClickAdditem.bind(this)} className="btn" value="Add new people" />
            }
        }

        const renderAddForm = () => {
            if (this.props.stateForm.visible_addForm && this.props.stateLoginForm.isValid) {
                return <Form
                            state={this.props.journal}
                            changeState={this.setStateForm.bind(this)}
                            formSubmitHandler={this.formSubmitHandler.bind(this)}
                            form="addForm"
                        />
            }
        }

        const renderEditForm = () => {
            if (this.props.stateLoginForm.isValid && this.row != null && this.props.stateJournal.data.length > 0 && this.props.stateForm.visible_deleteBtn) {
                return <DeleteButton
                            data={this.row} 
                            onHandlerDelete={this.onHandlerDelete.bind(this)} 
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
        stateForm: state.userForm,
        stateLoginForm: state.loginForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        journal: bindActionCreators(journalAction, dispatch),
        form: bindActionCreators(formAction, dispatch),
        loginForm: bindActionCreators(loginFormAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);