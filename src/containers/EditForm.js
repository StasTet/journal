import React, { Component } from 'react';

export default class EditForm extends Component {

    onSubmitEdit(event) {
        event.preventDefault();
        this.props.state.setMark(this.props.data.id, this.markInput.value);
        this.markInput.value = '';
    }

    render() {
        console.log(this.props.state)
        return (
                <div>
                    <div className="clear"></div>
                    <div>
                        <form onSubmit={this.onSubmitEdit.bind(this)}>
                            <label>Edit mark for {this.props.data.name}: </label><input type="number" ref={input => this.markInput = input} placeholder={this.props.data.mark}/>
                            <button>Save</button>
                        </form>
                    </div>
                </div>
        );
    }
}