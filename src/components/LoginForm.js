import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalAction from '../actions/journalAction';

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.login = '1';
        this.password = '1';
    }

    onSubmitHandler(event) {
        event.preventDefault();
        if (this.login == this.loginInput.value && this.password == this.passwordInput.value) {
            localStorage.setItem('login', true);
            this.props.journal.signIn();
        } else {
            console.log('error')
        }

        this.loginInput.value = '';
        this.passwordInput.value = '';
    }

    onClickSignOut(event) {
        event.preventDefault();
        localStorage.clear();
        this.props.journal.signOut();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="login-form">
                        {
                            this.props.stateJournal.login
                            ?   <form onSubmit={this.onClickSignOut.bind(this)} className="form-inline">
                                    <label>{this.login}</label>{' '}
                                    <button className="btn">Sign out</button>
                                </form>

                            :   <form onSubmit={this.onSubmitHandler.bind(this)} className="form-inline">
                                    <input type="text" ref={input => this.loginInput = input} className="form-control" placeholder="login"/>{' '}
                                    <input type="password" ref={input => this.passwordInput = input} className="form-control" placeholder="Password"/>{' '}
                                    <button className="btn btn-primary">Sign in</button>
                                </form>
                        }
                    </div> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateJournal: state.journal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        journal: bindActionCreators(journalAction, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);