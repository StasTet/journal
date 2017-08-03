import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from '../containers/Form';
import * as journalAction from '../actions/journalAction';
import * as formAction from '../actions/formAction';

class FullInformation extends Component {
    constructor(props) {
        super(props)

        this.active = null;
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

        this.props.journal.editItem(this.active._id, data);
    }

    render() {

        this.props.stateJournal.data.forEach((item) => {
            if (item.active) {
                this.active = item;
            }
        });

        const currentItem = this.active;

        console.log(this.props.journal)
        return (
            <div className="col-xs-12 col-md-12 col-lg-12">
                <p><Link to="/">Back to home</Link></p>
                
                <div className="col-xs-12 col-md-12 col-lg-6">
                    <ul className="list-group">
                        <li className="list-group-item">ID - {currentItem._id.substr(4,4)}</li>
                        <li className="list-group-item">Name - {currentItem.name}</li>
                        <li className="list-group-item">Surname - {currentItem.surname}</li>
                        <li className="list-group-item">Age - {currentItem.age}</li>
                        <li className="list-group-item">Phone - {currentItem.phone}</li>
                        <li className="list-group-item">Mark - {currentItem.mark}</li>
                    </ul>
                </div>

                <div className="col-xs-12 col-md-12 col-lg-6">
                    {
                        this.props.stateJournal.login &&
                            <Form
                                data={currentItem}
                                state={this.props.journal}
                                formSubmitHandler={this.formSubmitHandler.bind(this)}
                                form="editForm"
                            />
                    }
                </div>
               
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

export default connect(mapStateToProps, mapDispatchToProps)(FullInformation)