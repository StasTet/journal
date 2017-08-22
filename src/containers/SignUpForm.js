import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as journalAction from '../actions/journalAction';
import * as signUpFormAction from '../actions/signUpFormAction';

class SignUpForm extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.stateSignUpForm.isValid) {
            setTimeout(() => {
                this.props.history.push('/login')
            }, 1000);
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();

        const name = encodeURIComponent(this.nameInput.value);
        const email = encodeURIComponent(this.emailInput.value);
        const password = encodeURIComponent(this.passwordInput.value);
        const formData = `name=${name}&email=${email}&password=${password}`;

        this.props.signUpForm.signUp(formData);
    }

    render() {
        return (
            <div className="login-form">
                {
                   <form action="/" onSubmit={this.onSubmitHandler.bind(this)} className="form col-xs-6 col-md-4 col-lg-4 text-center">

                        { this.props.stateSignUpForm.errors.message && <p className="error text-danger">{this.props.stateSignUpForm.errors.message}</p> } 
                        { this.props.stateSignUpForm.data.message && <p className="text-success">{this.props.stateSignUpForm.data.message}</p> }

                        <input type="text" ref={input => this.nameInput = input} className="form-control" placeholder="Login" />
                        { (this.props.stateSignUpForm.errors.errors !== undefined && this.props.stateSignUpForm.errors.errors.name) && <p className="error text-danger">{this.props.stateSignUpForm.errors.errors.name}</p> } 

                        <input type="text" ref={input => this.emailInput = input} className="form-control" placeholder="Email" />
                        { (this.props.stateSignUpForm.errors.errors !== undefined && this.props.stateSignUpForm.errors.errors.email) && <p className="error text-danger">{this.props.stateSignUpForm.errors.errors.email}</p> } 

                        <input type="password" ref={input => this.passwordInput = input} className="form-control" placeholder="Password" />
                        { (this.props.stateSignUpForm.errors.errors !== undefined && this.props.stateSignUpForm.errors.errors.password) && <p className="error text-danger">{this.props.stateSignUpForm.errors.errors.password}</p> } 

                        <button className="btn btn-primary">Sign in</button>
                        <p className="">Already have an account? <Link to="/login">Log in</Link>.</p>
                    </form>
                        
                }
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateJournal: state.journal,
        stateSignUpForm: state.signUpForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        journal: bindActionCreators(journalAction, dispatch),
        signUpForm: bindActionCreators(signUpFormAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);