import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';

// ACTION NAMES
const GET_PRODUCTS = 'GET_PRODUCTS';

// ACTION CREATORS
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};

// THUNKS
export const fetchProducts = () => {
  return dispatch => {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getProducts(products)))
  }
};

// INITIAL STATE
const initialState = {
  products: []
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, { products: state.products });

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;
