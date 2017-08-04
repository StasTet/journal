import React, { Component } from 'react';

export const DeleteButton = (props) => {

    const renderDelBtn = () => {
        return <div>
                <p className="help-block">You may delete this item</p>
                <p>
                    <input type="button" onClick={() => props.onHandlerDelete(props.data._id)} className="btn btn-primary" value={'Delete ' + props.data.name} />
                    {' '}
                    <input type="button"onClick={() => props.changeState()} className="btn" value="Cancel" />
                </p>
            </div>
    }

    return renderDelBtn()
}