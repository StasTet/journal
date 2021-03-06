import axios from 'axios';
import Auth from '../modules/authentication';

import {
    getJournal,
    updateItem,
    deleteItem,
    createItem
} from '../api';

// export const setAuthorization = () => {
//     return (dispatch) => {
//         axios
//             .get(getJournal(), {
//                 headers: {'Authorization': 'token ' + Auth.getToken()}
//             })
//             .then((res) => {
//                 dispatch({
//                     type: 'SET_AUTH'
//                 })
//             })
//             .catch((err) => {
//                 console.error(err)
//             })
//     }
    


//         // const xhr = new XMLHttpRequest();

//         // xhr.open('get', '/api/journal');
//         // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         // // set the authorization HTTP header
//         // xhr.setRequestHeader('Authorization', `token ${Auth.getToken()}`);
//         // xhr.responseType = 'json';
//         // xhr.addEventListener('load', () => {
//         //     if (xhr.status === 200) {
//         //         this.setState({
//         //             secretData: xhr.response.message
//         //         });
//         //     }
//         // });
//         // xhr.send();
// }


export const setData = () => {
    return (dispatch) => {

        dispatch({
            type: 'LOAD_DATA_REQUESTED',
            data: []
        });

        axios
            .get(getJournal())
            .then((res) => {
                dispatch({
                    type: 'LOAD_DATA_OK',
                    data: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'LOAD_DATA_FAIL',
                    error: `${err}`
                })
            })
    }
}

export const sortData = (data) => {
    return {
        type: 'SORT_DATA',
        payload: data
    }
}

export const searchData = (data) => {
    return {
        type: 'SEARCH_DATA',
        payload: data
    }
}

export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const showActive = (id) => {
    return {
        type: 'SET_ACTIVE',
        payload: id
    }
}

export const editItem = (id, data) => {

    return (dispatch) => {
        
        axios.put(updateItem(id), data)
            .then((res) => {
                dispatch({
                    type: 'EDIT_ITEM',
                    id,
                    data
                })

            })
            .catch(console.error())
    }

}

export const addItem = (data) => {

    return (dispatch) => {

        axios.post(createItem(), data)
            .then((res) => {
                dispatch({
                    type: 'ADD_ITEM',
                    payload: {
                        _id: res.data.id,
                        ...data
                    }
                })

            })
            .catch(console.error())

    }
}

export const delItem = (id) => {

    return (dispatch) => {

        axios.delete(deleteItem(id))
            .then((res) => {

                dispatch({
                    type: 'DELETE_ITEM',
                    id
                })

            })
            .catch(console.error())
    }
}