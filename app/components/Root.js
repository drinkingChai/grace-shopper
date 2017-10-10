import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchProducts, fetchOrders } from '../store';

// Components
import Nav from './Nav';
import Products from './Products';
import Cart from './Cart';

export default class Root extends Component {
  componentDidMount () {
    store.dispatch(fetchProducts());
    store.dispatch(fetchOrders());
  }

  render () {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav } />
        <main className="container">
          <h1 style={{ marginBottom: '30px' }}>Welcome to GraceShopper!</h1>
          <div className="col-xs-12 col-sm-8">
            <Switch>
              <Route exact path="/products" component={ Products } />
              <Redirect exact path="/" to="/products" />
            </Switch>
          </div>
          <div className="col-xs-12 col-sm-4">
            <Cart />
          </div>
        </main>
      </div>
    )
  }
}
