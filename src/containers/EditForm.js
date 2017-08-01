import React, { Component } from 'react';

export default class EditForm extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     showPanel: true
        // }

    }

    onSubmitEdit(event) {
        event.preventDefault();
        this.props.state.setMark(this.props.data._id, this.markInput.value);
        this.markInput.value = '';
        this.props.localState();
    }

    onHandlerDelete() {
        this.props.state.delItem(this.props.data._id);
        this.props.localState();
    }

    render() {
        return (
            <div className="col-lg-6">
                <p className="help-block">You may delete this item...</p>
                <p><button onClick={this.onHandlerDelete.bind(this)} className="btn btn-primary">Delete <b>{this.props.data.name}</b></button></p>
                <p className="help-block">... or edit the mark</p>
                <form onSubmit={this.onSubmitEdit.bind(this)} className="form-horizontal container col-lg-12">
                    <div className="form-group col-lg-12">
                        <label>Edit mark for {this.props.data.name}</label>
                        <input type="number" ref={input => this.markInput = input} placeholder={this.props.data.mark} className="form-control"/></div>
                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}