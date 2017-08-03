import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validateField } from '../validation/errorMessages';

class EditForm extends Component {

    onSubmitClick(values) {
        const data = {
            name : values.name,
            surname: values.surname,
            age: values.age,
            phone: values.phone,
            mark: values.mark,
            active: false,
            visible: true
        }

        this.props.state.editItem(this.props.data._id, data);

    }

    render() {

        const { handleSubmit, reset } = this.props;
        const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
            <div>
                <label>{label}</label>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched && (error && <span className="label label-danger">{error}</span>)}
            </div>
        )

        const renderForm = () => {
            return (
                    <form onSubmit={handleSubmit(this.onSubmitClick.bind(this))} className="form-horizontal">
                        <div className="form-group col-lg-12">
                            <Field 
                                component={renderField} 
                                type="text"
                                label="Name"
                                name="name"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-lg-12">
                            <Field 
                                component={renderField} 
                                type="text"
                                label="Surname"
                                name="surname"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-lg-12">
                            <Field 
                                component={renderField} 
                                type="text"
                                label="Age"
                                name="age"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-lg-12">
                            <Field 
                                component={renderField}
                                type="text"
                                label="Phone"
                                name="phone"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-lg-12">
                            <Field 
                                component={renderField}
                                type="text"
                                label="Mark"
                                name="mark"
                                className="form-control"
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Save</button>
                        {' '}
                        <input type="button" className="btn" value="Clear Values" onClick={reset}/>
                    </form>
                    )
        }

        return (
            <div>
                { renderForm() }
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {}

    const field = [
        'name',
        'surname',
        'age',
        'phone',
        'mark'
    ]

    field.forEach((item) => {
        errors[item] = validateField(item, values[item]);
    })

    return errors
}

export default reduxForm({
    form: 'editItem',
    validate,
})(EditForm)