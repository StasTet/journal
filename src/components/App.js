import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peopleAction from '../actions/peopleAction';
import Main from './Main';

const mapStateToProps = (state) => {
    return {
        state: state.people
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        people: bindActionCreators(peopleAction, dispatch)
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Main);