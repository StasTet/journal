import axios from 'axios';
import Auth from '../modules/authentication'

export const logIn = (data) => {
    return (dispatch) => {
        
        axios.post('/auth/login', data)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: 'LOG_IN',
                    payload: res.data,
                })
                Auth.authenticateUser(res.data.token);
            })
            .catch((err) => {
                dispatch({
                    type: 'LOG_ERROR',
                    payload: err.response.data,
                })
            })
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}