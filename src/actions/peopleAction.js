import axios from 'axios';

import { getJournal, updateItem, deleteItem, createItem } from '../api';

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

export const setMark = (id, data) => {

  axios.put(updateItem(id), { mark: data })

  return {
    type: 'SET_MARK',
    id,
    data
  }
}

export const addItem = (data) => {

  return (dispatch) => {
      axios.post(createItem(data), {
        name: data.name,
        surname: data.surname,
        age: data.age,
        phone: data.phone,
        mark: data.mark,
        active: data.active,
        visible: data.visible
      })
      .then((res) => {
        
        axios.get(createItem(data))
          .then((res) => {
            const resData = res.data[res.data.length-1]

            dispatch({
              type: 'ADD_ITEM',
              payload: resData
            })
          })
          .catch(console.error())

      })
      .catch(console.error())
  }
}

export const delItem = (id) => {

  axios.delete(deleteItem(id));

  return {
    type: 'DELETE_ITEM',
    id
  }
}