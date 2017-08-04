const initialState = {
    isValid: false, // localStorage.getItem('login'),
    data: [],
    errors: {}
}

const loginForm = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN_IN':
            return {
                ...state,
                isValid: true,
                data: action.payload,
                errors: {}
            }

        case 'LOGIN_ERROR':
            return {
                ...state,
                isValid: false,
                data: [],
                errors: action.payload
            }

        case 'SIGN_OUT':
            return {
                ...state,
                isValid: false,
                data: [],
                errors: {}
            }

        default:
            return state;
    }
}

export default loginForm;