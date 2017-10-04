import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
// ACTION NAMES


// ACTION CREATORS


// THUNK


// INITIAL STATE
const initialState = {
  products: []
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
