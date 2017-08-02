const initialState = {
    visible_addForm: false,
    visible_editForm: false
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
                visible_editForm: true
            }

        case 'EDIT_FORM_HIDE':
            return {
                ...state,
                visible_editForm: false
            }

        default:
            return state;
    }
}

export default form;