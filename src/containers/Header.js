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

    onClickSignOut() {
        localStorage.clear();
        this.props.data.signOut();
        this.setState({
            login: localStorage.getItem('login')
        })
    }

    render() {
        return (
            <div className="header">
                <div className="wrapper">
                    <div className="login-form">
                        {
                            this.state.login
                            ?   <p>{this.login} <button onClick={this.onClickSignOut.bind(this)}>Sign out</button></p>
                            :   <form onSubmit={this.onSubmitHandler.bind(this)}>
                                    <input type="text" ref={input => this.loginInput = input} />
                                    <input type="password" ref={input => this.passwordInput = input} />
                                    <button>Sign in</button>
                                </form>
                              
                        }
                    </div>
                </div>
            </div>
            
        );
    }
}