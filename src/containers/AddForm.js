import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { errorMessages } from '../validation/errorMessages';

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
    
    errors.name = errorMessages.name.lengthName.validator(values.name);
    errors.surname = errorMessages.surname.lengthSurname.validator(values.surname);
    errors.age = errorMessages.age.lengthAge.validator(values.age);
    errors.phone = errorMessages.phone.lengthPhone.validator(values.phone);
    errors.mark = errorMessages.mark.lengthMark.validator(values.mark);

    return errors
}

export default reduxForm({
    form: 'addItem', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(AddItem)