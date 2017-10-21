import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import store, { checkSession, fetchProducts, fetchOrders, fetchCategories } from '../store';

// Components
import Nav from './Nav';
import Account from './useraccount/Account';
import Cart from './shopping/Cart';
import UAuth from './userauth/UAuth'
import CheckLogin from './userauth/CheckOutLogin'
import RegisterUser from './userauth/RegisterUser'
import Product from './productsview/Product'
import CheckOut from './shopping/CheckOut'
import PasswordUpdateForm from './userauth/PasswordUpdateForm'
import AdminPortal from './admin/AdminPortal'
import ProductsPanel from './productsview/FilterableProductsPanel';
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
              <Route exact path="/cart" component={ Cart } />
              <Route exact path="/check-login" component={ CheckLogin } />
              <Route exact path="/login" component={ UAuth } />
              <Route exact path="/register" component={ RegisterUser } />
              <Route exact path="/changepassword" component={ PasswordUpdateForm } />
              <Route path="/admin" component={ AdminPortal } />
            </Switch>
          </div>
          <div className="col-xs-12 col-sm-4">
            <Route exact path="/" component={ Cart } />
            <Route exact path='/' render={ () =>
              <Link to="/check-login" className="btn btn-primary btn-sm">Checkout</Link> }/>
          </div>
          <div className="col-xs-12">
            <Route exact path="/products/:id" component = { Product } />
          </div>
        </main>
      </div>
    )
  }
}
