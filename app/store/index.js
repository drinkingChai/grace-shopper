import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import currentUser from './currentUser';
import cart from './cart'
import products from './products'
import orders from './orders'


const reducer = combineReducers({
  currentUser,
  cart,
  orders,
  products
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;

export * from './currentUser';
export * from './cart';
export * from './products';
export * from './orders';
