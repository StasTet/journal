import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { max_mark } from '../constants/form';

class EditForm extends Component {

    onSubmitEdit(values) {
        this.props.state.setMark(this.props.data._id, values.mark);
        this.props.localState();
    }

    onHandlerDelete() {
        this.props.state.delItem(this.props.data._id);
        this.props.localState();
    }

    render() {
        const { handleSubmit } = this.props;
        const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
            <div>
                <label>Edit mark for {this.props.data.name}</label>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched && ((error && <span className="label label-danger">{error}</span>))}
            </div>
        )

        return (
            <div className="col-lg-6">
                <p className="help-block">You may delete this item...</p>
                <p>
                    <button onClick={this.onHandlerDelete.bind(this)} className="btn btn-primary">
                        Delete <b>{this.props.data.name}</b>
                    </button>
                </p>
                <p className="help-block">... or edit the mark</p>

                <form onSubmit={handleSubmit(this.onSubmitEdit.bind(this))} className="form-horizontal container col-lg-12">
                    <div className="form-group col-lg-12">
                        <Field
                            component={renderField}
                            type="text"
                            label={this.props.data.mark}
                            name="mark"
                            className="form-control"
                        />
                        </div>
                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {}

    if (!values.mark) {
        errors.mark = 'Required'
    } else if (isNaN(Number(values.mark))) {
        errors.mark = 'Must be a number'
    } else if (Number(values.mark) > max_mark) {
        errors.mark = 'Sorry, mark must be less then 5'
    }

    return errors
}

export default reduxForm({
    form: 'editItem',
    validate,
})(EditForm)