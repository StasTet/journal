import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validateField } from '../validation/errorMessages';

class EditForm extends Component {

    onSubmitEdit(values) {
        this.props.state.setMark(this.props.data._id, values.mark);
        this.props.changeState();
    }

    onHandlerDelete() {
        this.props.state.delItem(this.props.data._id);
        this.props.changeState();
    }

    onHandlerCancelDelete() {
        this.props.changeState();
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

        const renderDelBtn = () => {
            return <div>
                    <p className="help-block">You may delete this item...</p>
                    <p>
                        <input type="button" onClick={this.onHandlerDelete.bind(this)} className="btn btn-primary" value={'Delete ' + this.props.data.name} />
                        {' '}
                        <input type="button"onClick={this.onHandlerCancelDelete.bind(this)} className="btn" value="Cancel" />
                    </p>
                    <p className="help-block">... or edit the mark</p>
                </div>
        }

        const renderForm = () => {
            return <form onSubmit={handleSubmit(this.onSubmitEdit.bind(this))} className="form-horizontal">
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
        }

        return (
            <div className="col-lg-6">
                { renderDelBtn() }
                { renderForm() }
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {}

    const field = [
        'mark'
    ]

    field.map((item) => {
        errors[item] = validateField(item, values[item]);
    })

    return errors
}

export default reduxForm({
    form: 'editItem',
    validate,
})(EditForm)