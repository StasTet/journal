const initialState = {
    isValid: false, // localStorage.getItem('login'),
    data: {},
    errors: {}
}

const signUpForm = (state = initialState, action) => {

    switch (action.type) {
        case 'SIGN_UP':
            return {
                ...state,
                isValid: action.payload.success,
                data: action.payload,
                errors: {}
            }

        case 'SIGN_ERROR':
            return {
                ...state,
                isValid: action.payload.success,
                data: [],
                errors: action.payload
            }

        case 'SIGN_OUT':
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

export default signUpForm;