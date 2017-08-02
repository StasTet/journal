import React, { Component } from 'react';
import '../style/header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.login = '1';
        this.password = '1';

        this.state = {
            login: localStorage.getItem('login')
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        if (this.login == this.loginInput.value && this.password == this.passwordInput.value) {
            localStorage.setItem('login', true);
            this.props.data.signIn();
            this.setState({
                login: localStorage.getItem('login')
            })
        } else {
            console.log('error')
        }

        this.loginInput.value = '';
        this.passwordInput.value = '';
    }

    onClickSignOut(event) {
        event.preventDefault();
        localStorage.clear();
        this.props.data.signOut();
        this.setState({
            login: localStorage.getItem('login')
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="login-form">
                        {
                            this.state.login
                            ?   <form onSubmit={this.onClickSignOut.bind(this)} className="form-inline"><label>{this.login}</label> <button className="btn">Sign out</button></form>
                            :   <form onSubmit={this.onSubmitHandler.bind(this)} className="form-inline">
                                    <input type="text" ref={input => this.loginInput = input} className="form-control" placeholder="login"/>
                                    <input type="password" ref={input => this.passwordInput = input} className="form-control" placeholder="Password"/>
                                    <button className="btn">Sign in</button>
                                </form>
                              
                        }
                    </div>
                </div>
            </div>
            
        );
    }
}