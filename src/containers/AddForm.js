import React, { Component } from 'react';

export default class AddItem extends Component {

     onSubmitEdit(event) {
        event.preventDefault();

        const data = {
            name : this.nameInput.value,
            surname: this.surnameInput.value,
            age: this.ageInput.value,
            phone: this.phoneInput.value,
            mark: this.markInput.value,
            active: false,
            visible: true
        }

        this.props.state.addItem(data);

        this.nameInput.value = '';
        this.surnameInput.value = '';
        this.ageInput.value = '';
        this.phoneInput.value = '';
        this.markInput.value = '';
        this.props.localState();
    }

    render() {
        return (
            <form onSubmit={this.onSubmitEdit.bind(this)}>
                <p>Add new people</p>
                <div><label>Edit name : </label><input type="text" ref={input => this.nameInput = input} placeholder="Add name" required/></div>
                <div><label>Edit surname : </label><input type="text" ref={input => this.surnameInput = input} placeholder="Add surname" required/></div>
                <div><label>Edit age : </label><input type="number" ref={input => this.ageInput = input} placeholder="Add age" required/></div>
                <div><label>Edit phone : </label><input type="text" ref={input => this.phoneInput = input} placeholder="Add phone" required/></div>
                <div><label>Edit mark : </label><input type="number" ref={input => this.markInput = input} placeholder="Add mark" required/></div>
                <button>Save</button>
            </form>
            
        );
    }
}