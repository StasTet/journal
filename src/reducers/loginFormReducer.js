const initialState = {
    isValid: (localStorage.getItem('token') ? true : false), // localStorage.getItem('login'),
    data: {},
    errors: {}
}

const loginForm = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isValid: action.payload.success,
                data: action.payload,
                errors: {}
            }

        case 'LOG_ERROR':
            return {
                ...state,
                isValid: action.payload.success,
                data: {},
                errors: action.payload
            }

        case 'LOG_OUT':
            return {
                ...state,
                isValid: action.payload.success,
                data: {},
                errors: {}
            }

        default:
            return state;
    }
}

export default loginForm;