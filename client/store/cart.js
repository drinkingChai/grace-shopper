import axios from 'axios';
import { fetchOrders } from './orders';

const ADD_TO_CART = 'ADD_TO_CART';

export const updateCartItem = (product, quantity) => dispatch =>
  axios.put(`/api/orders/products/${product.id}`, { quantity, price: product.price })
    .then(() => dispatch(fetchOrders()))
    .catch(err => console.log(err.message))

export const checkOut = (checkoutData) => dispatch =>
  axios.put('/api/orders/check-out', checkoutData)
    .then(() => dispatch(fetchOrders()))
    //.catch(err => console.log(err.message))

const initialState = {}

const reducer = (state= initialState, action) =>{

  switch (action.type){
    default:
      return state
  }
}

export default reducer;
