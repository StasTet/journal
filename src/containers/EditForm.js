import React, { Component } from 'react';

export default class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPanel: false
        }
    }

    onSubmitEdit(event) {
        event.preventDefault();
        this.props.state.setMark(this.props.data._id, this.markInput.value);
        this.markInput.value = '';
        this.props.localState();
    }

    onHandlerDelete() {
        this.props.state.delItem(this.props.data._id);
    }

    render() {
        return (
            <div>
                <div className="clear"></div>
                <p><button onClick={this.onHandlerDelete.bind(this)}>Delete <b>{this.props.data.name}</b></button></p>
                <div>
                    <form onSubmit={this.onSubmitEdit.bind(this)}>
                        <div><label>Edit mark for {this.props.data.name} : </label><input type="number" ref={input => this.markInput = input} placeholder={this.props.data.mark}/></div>
                        <button>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}