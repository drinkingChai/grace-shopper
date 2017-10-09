import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';

// INITIAL STATE
const initialState = {
  products: [],
  currentUser: {}
};

// ACTION NAMES
const GET_PRODUCTS = 'GET_PRODUCTS';
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// ACTION CREATORS
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};
const login = user => ({ type: LOGIN, user })
const logout = () => ({ type: LOGOUT })

// THUNKS
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(getProducts(products)))
    .catch(err => console.error('Fetching products unsuccessful', err));
}

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

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { currentUser: action.user })
    case LOGOUT:
      return Object.assign({}, state, { currentUser: {} })
    case GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;
