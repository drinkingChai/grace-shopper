import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import currentUser from './currentUser';
import cart from './cart'
import products from './products'
import orders from './orders'
import reviews from './reviews'
import users from './users'
import categories from './categories';


const reducer = combineReducers({
  currentUser,
  cart,
  orders,
  products,
  reviews,
  users,
  categories
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;

export * from './currentUser';
export * from './cart';
export * from './products';
export * from './orders';
export * from './reviews';
export * from './users';
export * from './categories';
