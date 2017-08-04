import axios from 'axios';

export const logIn = (data) => {
    return (dispatch) => {
        
        axios.post('/auth/login', data)
            .then((res) => {
                dispatch({
                    type: 'LOG_IN',
                    payload: data,
                })
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