import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class AddItem extends Component {

     onSubmitEdit(values) {
        const data = {
            name : values.name,
            surname: values.surname,
            age: values.age,
            phone: values.phone,
            mark: values.mark,
            active: false,
            visible: true
        }

        this.props.state.addItem(data);
        this.props.localState();
    }

    render() {
        const { handleSubmit } = this.props;
        const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
            <div>
                <label>{label}</label>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched && ((error && <span className="label label-danger">{error}</span>) || (warning && <span className="label label-warning">{warning}</span>))}
            </div>
        )

        return (
            <div className="col-lg-6">
                <form onSubmit={handleSubmit(this.onSubmitEdit.bind(this))} className="form-horizontal container col-lg-12">
                    <p className="help-block">Add new people</p>
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
                </form>
            </div>
            
        );
    }
}


const validate = (values) => {
    const errors = {}

    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }

    if (!values.surname) {
        errors.surname = 'Required'
    } else if (values.surname.length > 15) {
        errors.surname = 'Must be 15 characters or less'
    }
    // if (!values.email) {
    //     errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address'
    // }

    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 8) {
        errors.age = 'Sorry, you must be at least more then 8 years old'
    }

    if (!values.phone) {
        errors.phone = 'Required'
    } else if (values.phone.length < 6 && values.phone.length > 11) {
        errors.phone = 'Must be more then 6 and less then 11 characters'
    }

    if (!values.mark) {
        errors.mark = 'Required'
    } else if (isNaN(Number(values.mark))) {
        errors.mark = 'Must be a number'
    } else if (Number(values.age) <= 5) {
        errors.mark = 'Sorry, mark must be less then 5'
    }

    return errors
}


    // const warn = (values) => {
    //     const warnings = {}

    //     if (values.age < 8) {
    //         warnings.age = 'Hmm, you seem a bit young...'
    //     }
    //     return warnings
    // }



export default reduxForm({
    form: 'addItem', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    // warn // <--- warning function given to redux-form
})(AddItem)