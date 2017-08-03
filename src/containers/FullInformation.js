import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FullInformation extends Component {
    constructor(props) {
        super(props)

        this.active = null;
    }
   
    render() {

        this.props.stateJournal.data.forEach((item) => {
            if (item.active) {
                this.active = item;
            }
        });

        const currentItem = this.active;

        return (
            <div className="col-xs-12 col-md-12 col-lg-12">
                <Link to="/">Back to home!</Link>
                {
                    currentItem !== undefined &&
                        <ul className="list-group">
                            <li className="list-group-item">ID - {currentItem._id.substr(4,4)}</li>
                            <li className="list-group-item">Name - {currentItem.name}</li>
                            <li className="list-group-item">Surname - {currentItem.surname}</li>
                            <li className="list-group-item">Age - {currentItem.age}</li>
                            <li className="list-group-item">Phone - {currentItem.phone}</li>
                            <li className="list-group-item">Mark - {currentItem.mark}</li>
                        </ul>
                } 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateJournal: state.journal
    }
}

export default connect(mapStateToProps)(FullInformation)