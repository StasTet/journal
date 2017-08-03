const initialState = {
    visible_addForm: false,
    visible_deleteBtn: false
}

const form = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FORM_SHOW':
            return {
                ...state,
                visible_addForm: true
            }

        case 'ADD_FORM_HIDE':
            return {
                ...state,
                visible_addForm: false
            }
        case 'EDIT_FORM_SHOW':
            return {
                ...state,
                visible_deleteBtn: true
            }

        case 'EDIT_FORM_HIDE':
            return {
                ...state,
                visible_deleteBtn: false
            }

        default:
            return state;
    }
}

export default form;