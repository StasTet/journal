import axios from 'axios';

export const signIn = (data) => {
    return (dispatch) => {
        
        axios.post('/auth/login', data)
            .then((res) => {
                dispatch({
                    type: 'LOGIN_IN',
                    payload: data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: err.response.data,
                })
            })
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}