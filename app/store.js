import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axios from 'axios'

// ACTION NAMES
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// ACTION CREATORS
const login = user => ({ type: LOGIN, user })
const logout = () => ({ type: LOGOUT })


// THUNK
export const checkSession = () => dispatch =>
  axios.get('/api/sessions')
    .then(res => dispatch(login(res.data)))
    .catch(err => console.log(err.message))

export const loginUser = (email, password) => dispatch =>
  axios.put('/api/sessions', { email, password })
    .then(() => dispatch(checkSession()))
    .catch(err => console.log(err.message))

export const logoutUser = () => dispatch =>
  axios.delete('/api/sessions')
    .then(() => dispatch(logout()))
    .catch(err => console.log(err.message))

// INITIAL STATE
const initialState = {
  products: [],
  currentUser: {}
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { currentUser: action.user })
    case LOGOUT:
      return Object.assign({}, state, { currentUser: {} })
    default:
      return state
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
