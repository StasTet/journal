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
            // visible: true,
            // active: false,
            // mark: this.markInput.value,
            // phone: this.phoneInput.value,
            // age: this.ageInput.value,
            // surname: this.surnameInput.value,
            // name : this.nameInput.value,
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
            <div className="col-lg-6">
                <form onSubmit={this.onSubmitEdit.bind(this)} className="form-horizontal container col-lg-12">
                    <p className="help-block">Add new people</p>
                    <div className="form-group col-lg-12">
                        <label htmlFor="name">Edit name</label>
                        <input type="text" ref={input => this.nameInput = input} placeholder="Add name" name="name" className="form-control"/>
                    </div>
                    <div className="form-group col-lg-12">
                        <label htmlFor="surname">Edit surname</label>
                        <input type="text" ref={input => this.surnameInput = input} placeholder="Add surname" name="surname" className="form-control"/>
                    </div>
                    <div className="form-group col-lg-12">
                        <label htmlFor="age">Edit age</label>
                        <input type="number" ref={input => this.ageInput = input} placeholder="Add age" name="age" className="form-control"/>
                    </div>
                    <div className="form-group col-lg-12">
                        <label htmlFor="phone">Edit phone</label>
                        <input type="text" ref={input => this.phoneInput = input} placeholder="Add phone" name="phone" className="form-control"/>
                    </div>
                    <div className="form-group col-lg-12">
                        <label htmlFor="mark">Edit mark</label>
                        <input type="number" ref={input => this.markInput = input} placeholder="Add mark" name="mark" className="form-control"/>
                    </div>
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>
            </div>
            
        );
    }
}