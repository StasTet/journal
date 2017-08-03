import React from 'react';
import { uniqueId } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import validate from '../validation/validate';

const Form = (props) => {

    const { handleSubmit, reset, formSubmitHandler } = props;
    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <div>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type} className="form-control" />
            {touched && (error && <span className="label label-danger">{error}</span>)}
        </div>
    )

    const renderForm = () => {
        return (
                <form onSubmit={handleSubmit(formSubmitHandler)} className="form-horizontal">
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
                    {
                        (props.form == 'addForm')
                        && <input type="button" className="btn" value="Cancel" onClick={() => props.changeState()}/>
                    }

                    {
                        (props.form == 'editForm')
                        && <input type="button" className="btn" value="Clear Values" onClick={reset}/>
                    }
                    
                </form>
                )
    }

    return (
        <div>
            { renderForm() }
        </div>
    );
}

export default reduxForm({
    form: uniqueId(''),
    validate,
})(Form)