import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import people from './peopleReducer'

export default combineReducers({
    people,
    form : formReducer
});