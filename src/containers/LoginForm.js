import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as journalAction from '../actions/journalAction';
import * as loginFormAction from '../actions/loginFormAction';
import '../style/loginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props)

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.stateLoginForm.isValid) {
            this.props.history.push('/')
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();

        const email = encodeURIComponent(this.emailInput.value);
        const password = encodeURIComponent(this.passwordInput.value);
        const formData = `email=${email}&password=${password}`;

        this.props.loginForm.logIn(formData);
    }

    render() {
        return (
            <div className="login-form">
                {
                    <form action="/" onSubmit={this.onSubmitHandler.bind(this)} className="form col-xs-6 col-md-4 col-lg-4 text-center">

                        { this.props.stateLoginForm.errors.message && <p className="error text-danger">{this.props.stateLoginForm.errors.message}</p> }
                        { this.props.stateLoginForm.data.message && <p className="text-success">{this.props.stateLoginForm.data.message}</p> }

                        <input type="text" ref={input => this.emailInput = input} className="form-control" placeholder="Email"/>
                        { (this.props.stateLoginForm.errors.errors !== undefined && this.props.stateLoginForm.errors.errors.email) && <p className="error text-danger">{this.props.stateLoginForm.errors.errors.email}</p> }

                        <input type="password" ref={input => this.passwordInput = input} className="form-control" placeholder="Password"/>
                        { (this.props.stateLoginForm.errors.errors !== undefined && this.props.stateLoginForm.errors.errors.password) && <p className="error text-danger">{this.props.stateLoginForm.errors.errors.password}</p> }

                        <button className="btn btn-primary">Log in</button>
                        <p className="">Don't have an account? <Link to="/signup">Create one</Link>.</p>
                    </form>
                        
                }
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateJournal: state.journal,
        stateLoginForm: state.loginForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        journal: bindActionCreators(journalAction, dispatch),
        loginForm: bindActionCreators(loginFormAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);