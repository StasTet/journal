import React, { Component } from 'react';

export default class FullInformation extends Component {
   
    render() {

        const currentItem = this.props.data.data[this.props.index]

        return (
            <div className="full-information">

                {currentItem !== undefined &&
                <ul>
                    <li>ID - {currentItem.id}</li>
                    <li>Name = {currentItem.name}</li>
                    <li>Surname - {currentItem.surname}</li>
                    <li>Age - {currentItem.age}</li>
                    <li>Phone - {currentItem.phone}</li>
                    {   
                        currentItem.mark != null &&
                        <li>Mark - {currentItem.mark}</li>
                    }
                </ul>
                  
                   
                }
            </div>
        );
    }
}