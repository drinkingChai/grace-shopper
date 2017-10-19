import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { checkSession, fetchProducts, fetchOrders, fetchCategories } from '../store';

// Components
import Nav from './Nav';
import Account from './Account';
import Cart from './Cart';
import UserAuth from './UserAuth'
import Product from './Product'
import CheckOut from './CheckOut'
import PasswordUpdateForm from './PasswordUpdateForm'
import AdminPortal from './AdminPortal'
import ProductsPanel from './FilterableProductsPanel';
import Order from './Order';

export default class Root extends Component {
  componentDidMount () {
    store.dispatch(fetchProducts());
    store.dispatch(fetchCategories());
    store.dispatch(checkSession());
  }

  render () {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav } />

        <main className="container-fluid">
          <h1 className="headline">GRACESHOPPER</h1>
          <div className="col-xs-12 col-sm-8">
            <Switch>
              <Route exact path="/" component={ ProductsPanel } />
              <Route exact path="/account" component={ Account } />
              <Route exact path="/orders/:id" component = { Order } />
              <Route exact path="/checkout" component={ CheckOut } />
              <Route exact path="/login" component={ UserAuth } />
              <Route exact path="/changepassword" component={ PasswordUpdateForm } />
              <Route path="/admin" component={ AdminPortal } />
            </Switch>
          </div>
          <div className="col-xs-12 col-sm-4">
            <Route exact path="/" component={ Cart } />
          </div>
          <div className="col-xs-12">
            <Route exact path="/products/:id" component = { Product } />
          </div>
        </main>
      </div>
    )
  }
}
