import axios from 'axios';
import { fetchOrders } from './orders';
import { fetchProducts } from './products'
import { setErrorAndClear } from './error'

const ADD_TO_CART = 'ADD_TO_CART';

export const updateCartItem = (product, quantity) => dispatch =>
  axios.put(`/api/orders/products/${product.id}`, { quantity, price: product.price })
    .then(() => dispatch(fetchOrders()))
    .catch(setErrorAndClear)

export const checkOut = (checkoutData) => dispatch =>
  axios.put('/api/orders/check-out', checkoutData)
    .then(res => res.data)

const initialState = {};

const reducer = (state= initialState, action) =>{

  switch (action.type){
    default:
      return state;
  }
}

export default reducer;
