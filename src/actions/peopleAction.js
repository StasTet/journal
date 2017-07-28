import axios from 'axios';

import { getJournal } from '../api';

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

export const setMark = (id, mark) => {
  return {
    type: 'SET_MARK',
    id,
    mark
  }
}