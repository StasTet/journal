import React, { Component } from 'react';

export default class FullInformation extends Component {
   
    render() {

        const currentItem = this.props.data.data[this.props.index]

        return (
            <div className="row col-lg-3">

                {currentItem !== undefined &&
                <ul className="list-group">
                    <li className="list-group-item">ID - {currentItem._id.substr(4,4)}</li>
                    <li className="list-group-item">Name - {currentItem.name}</li>
                    <li className="list-group-item">Surname - {currentItem.surname}</li>
                    <li className="list-group-item">Age - {currentItem.age}</li>
                    <li className="list-group-item">Phone - {currentItem.phone}</li>
                    {   
                        currentItem.mark != null &&
                        <li className="list-group-item">Mark - {currentItem.mark}</li>
                    }
                </ul>
                  
                   
                }
            </div>
        );
    }
}