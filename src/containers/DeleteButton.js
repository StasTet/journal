import React, { Component } from 'react';

export default class DeleteButton extends Component {

    onHandlerDelete() {
        this.props.state.delItem(this.props.data._id);
        this.props.changeState();
    }

    onHandlerCancelDelete() {
        this.props.changeState();
    }

    render() {

        const renderDelBtn = () => {
            return <div>
                    <p className="help-block">You may delete this item</p>
                    <p>
                        <input type="button" onClick={this.onHandlerDelete.bind(this)} className="btn btn-primary" value={'Delete ' + this.props.data.name} />
                        {' '}
                        <input type="button"onClick={this.onHandlerCancelDelete.bind(this)} className="btn" value="Cancel" />
                    </p>
                </div>
        }

        return (
            <div className="col-lg-6">
                { renderDelBtn() }
            </div>
        );
    }
}