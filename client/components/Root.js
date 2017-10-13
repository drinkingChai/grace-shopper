import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { checkSession, fetchProducts, fetchOrders } from '../store';

// Components
import Nav from './Nav';
import Products from './Products';
import Account from './Account';
import Cart from './Cart';
import UserAuth from './UserAuth'

export default class Root extends Component {
  componentDidMount () {
    store.dispatch(fetchProducts());
    //store.dispatch(fetchOrders());
    store.dispatch(checkSession())
  }

  render () {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav } />

        <main className="container">
          <h1 className="headline">GRACESHOPPER</h1>
          <div className="col-xs-12 col-sm-8">
            <Switch>
              <Route exact path="/" component={ Products } />
              <Route exact path="/account" component={ Account } />
              <Redirect path="/" to="/" />
            </Switch>
          </div>
          <div className="col-xs-12 col-sm-4">
            <Route component={ UserAuth } />
            <Cart />
          </div>
        </main>
      </div>
    )
  }
}
