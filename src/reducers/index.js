import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import journal from './journalReducer';
import userForm from './formReducer';
import loginForm from './loginFormReducer';

export default combineReducers({
    journal,
    userForm,
    form : formReducer,
    loginForm
});