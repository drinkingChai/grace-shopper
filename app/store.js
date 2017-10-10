import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';

// ACTION NAMES
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_ORDERS = 'GET_ORDERS';

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
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(getProducts(products)))
    .catch(err => console.error('Fetching products unsuccessful.', err));
}

export const fetchOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => res.data)
    .then(orders => dispatch(getOrders(orders)))
    .catch(err => console.error('Fetching orders unsuccessful.', err));
};

export const updateCartItem = (product, quantity) => dispatch => {
  axios.put(`/api/orders/products/${product.id}`, { quantity, price: product.price })
    .then(() => dispatch(fetchOrders()))
    .catch(err => console.error('updateCartItem unsuccessful.', err));
};

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
