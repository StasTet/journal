import axios from 'axios';

export const signUp = (data) => {
    return (dispatch) => {
        
        axios.post('/auth/signup', data)
            .then((res) => {
                dispatch({
                    type: 'SIGN_UP',
                    payload: data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'SIGN_ERROR',
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