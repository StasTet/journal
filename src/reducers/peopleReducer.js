import {
    uniqueId,
    assign,
    sortBy,
    findIndex
} from 'lodash';

const initialState = {
    loading: false,
    data: [],
    error: null,
    inverse: false,
    login: false
}

const counter = (state = initialState, action) => {

    switch (action.type) {
        case 'LOAD_DATA_REQUESTED':
            return {
                ...state,
                data: [],
                loading: true,
            }

        case 'LOAD_DATA_OK':
            return {
                ...state,
                data: action.data.map((item) => ({ ...item,
                    id: uniqueId(),
                    active: false,
                    visible: true
                })),
                loading: false
            }

        case 'LOAD_DATA_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case 'SORT_DATA':
            if (state.inverse) {
                return {
                    ...state,
                    data: state.data.reverse(),
                    inverse: false
                }
            } else {
                return {
                    ...state,
                    data: sortBy(state.data, [action.payload]),
                    inverse: true
                }
            }

        case 'SEARCH_DATA':
            return {
                ...state,
                data: state.data.map((item) => ({ ...item,
                    visible: item.surname.toLowerCase().includes(action.payload.trim())
                }))
            }

        case 'SIGN_IN':
            return {
                ...state,
                login: true
            }

        case 'SIGN_OUT':
            return {
                ...state,
                login: false
            }

        case 'SET_ACTIVE':
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (item.id !== action.payload) {
                        return {
                            ...item,
                            active: false
                        };
                    }
                    return {
                        ...item,
                        active: true
                    };
                })
            }

        case 'SET_MARK':
            const currentIndex = findIndex(state.data, (obj) => obj.id == action.id);

            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (index !== currentIndex) {
                        return item;
                    }
                    return {
                        ...item,
                        mark: action.mark
                    };
                })
            }

        default:
            return state;
    }
}

export default counter;