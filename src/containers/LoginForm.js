import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalAction from '../actions/journalAction';
import * as loginFormAction from '../actions/loginFormAction';
import '../style/loginForm.scss';

class LoginForm extends Component {
    // constructor(props) {
    //     super(props)

    //     this.login = '1';
    //     this.password = '1';
        
    //     this.errors = {};
    // }

    onSubmitHandler(event) {
        event.preventDefault();
        localStorage.clear();
        // console.log('email:', this.passwordInput.value);
        // console.log('password:', this.loginInput.value);

        const login = encodeURIComponent(this.loginInput.value);
        const password = encodeURIComponent(this.passwordInput.value);
        // const formData = `login=${login}&password=${password}`;
        const formData = {
            login,
            password
        }

        

        // if (!this.props.stateLoginForm.isValid) {
            this.props.loginForm.signIn(formData);
            // (this.props.stateLoginForm.errors.message) && localStorage.setItem('login', true);
        // }
        

        // if (this.login == this.loginInput.value && this.password == this.passwordInput.value) {
        //     localStorage.setItem('login', true);
        //     this.props.journal.signIn();
        // } else {
        //     console.log('error')
        // }

        // this.loginInput.value = '';
        // this.passwordInput.value = '';
    }

    onClickSignOut(event) {
        event.preventDefault();
        localStorage.clear();
        this.props.loginForm.signOut();

        // this.props.journal.signOut();
    }

    render() {
        return (
            <div className="login-form">
                {
                    this.props.stateLoginForm.isValid
                    ?   <form onSubmit={this.onClickSignOut.bind(this)} className="form col-xs-6 col-md-4 col-lg-4 text-center">
                            <label>Admin</label>{' '}
                            <button className="btn">Sign out</button>
                        </form>

                    :   <form onSubmit={this.onSubmitHandler.bind(this)} className="form col-xs-6 col-md-4 col-lg-4 text-center">
                            { this.props.stateLoginForm.errors.message && <p className="error text-danger">{this.props.stateLoginForm.errors.message}</p> }

                            <input type="text" ref={input => this.loginInput = input} className="form-control" placeholder="login"/>
                            { (this.props.stateLoginForm.errors.errors !== undefined && this.props.stateLoginForm.errors.errors.login) && <p className="error text-danger">{this.props.stateLoginForm.errors.errors.login}</p> }

                            <input type="password" ref={input => this.passwordInput = input} className="form-control" placeholder="Password"/>
                            { (this.props.stateLoginForm.errors.errors !== undefined && this.props.stateLoginForm.errors.errors.password) && <p className="error text-danger">{this.props.stateLoginForm.errors.errors.password}</p> }

                            <button className="btn btn-primary">Sign in</button>
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