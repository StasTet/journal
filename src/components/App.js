import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as journalAction from '../actions/journalAction';
import * as formAction from '../actions/formAction';
import Main from './Main';

const mapStateToProps = (state) => {
    return {
        stateJournal: state.journal,
        stateForm: state.userForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        journal: bindActionCreators(journalAction, dispatch),
        form: bindActionCreators(formAction, dispatch)
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Main);