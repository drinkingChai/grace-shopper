import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';

// ACTION NAMES
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_ORDERS = 'GET_ORDERS';
const ADD_TO_CART = 'ADD_TO_CART';

// ACTION CREATORS
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders
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

export const fetchOrders = () => {
  return dispatch => {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(getOrders(orders)))
  }
};

export const addToCart = product => dispatch =>
  axios.put(`/api/orders/products/${product.id}`, { quantity: 1, price: product.price })
    .then(() => dispatch(fetchOrders()))

// INITIAL STATE
const initialState = {
  products: [],
  orders: []
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });
    case GET_ORDERS:
      return Object.assign({}, state, {orders: action.orders})
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;
