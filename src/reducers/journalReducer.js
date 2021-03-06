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
    auth: (localStorage.getItem('token') ? true : false)
    // login: localStorage.getItem('login')
}

const journal = (state = initialState, action) => {

    const currentIndex = findIndex(state.data, (obj) => obj._id == action.id);

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
                data: action.data,
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

        case 'SET_AUTH':
            return {
                ...state,
                auth: true
            }

        // case 'SIGN_IN':
        //     return {
        //         ...state,
        //         login: localStorage.getItem('login')
        //     }

        // case 'SIGN_OUT':
        //     return {
        //         ...state,
        //         login: localStorage.getItem('login')
        //     }

        case 'SET_ACTIVE':
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (item._id !== action.payload) {
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

        case 'EDIT_ITEM':
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (index !== currentIndex) {
                        return item;
                    }
                    return {
                        ...item,
                        active: true,
                        name: action.data.name,
                        surname: action.data.surname,
                        age: action.data.age,
                        phone: action.data.phone,
                        mark: action.data.mark
                    };
                })
            }

        case 'ADD_ITEM':
            return {
                ...state,
                data: [
                    ...state.data.slice(0),
                    action.payload
                ]
            }

        case 'DELETE_ITEM':
            return {
                ...state,
                data: [
                    ...state.data.slice(0, currentIndex),
                    ...state.data.slice(currentIndex + 1)
                ]
            }

        default:
            return state;
    }
}

export default journal;