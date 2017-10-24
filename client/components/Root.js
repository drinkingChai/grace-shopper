import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import store, { checkSession, fetchProducts, fetchCategories } from '../store';

// Components
import Nav from './Nav';
import Product from './productsview/Product';
import ProductsPanel from './productsview/FilterableProductsPanel';
import CheckOut from './shopping/CheckOut'
import OrderConfirmation from './shopping/OrderConfirmation';
import UAuth from './userauth/UAuth'
import PasswordUpdateForm from './userauth/PasswordUpdateForm'
import CheckLogin from './userauth/CheckOutLogin'
import RegisterUser from './userauth/RegisterUser'
import Account from './useraccount/Account';
import AdminPortal from './admin/AdminPortal'
import Order from './Order';
import ErrorMessage from './errorstatus/ErrorMessage';
import Cart from './shopping/Cart';

export default class Root extends Component {
  componentDidMount () {
    store.dispatch(fetchProducts());
    store.dispatch(fetchCategories());
    store.dispatch(checkSession());
  }

  render () {
    return (
      <div>
        <ErrorMessage />
        <Route component={ Nav } />

        <main className="container-fluid">
          <h1 className="headline">RetroShopper</h1>
            <Switch>
              <Route exact path="/" component={ ProductsPanel } />
              <Route exact path="/cart" component={ Cart } />
              <Route exact path="/categories" component={ ProductsPanel } />
              <Route exact path="/categories/:id" component={ ProductsPanel } />
              <Route exact path="/products" component={ ProductsPanel } />
              <Route exact path="/orders/:id" component = { Order } />
              <Route exact path="/products/:id" component = { Product } />
              <Route exact path="/checkout" component={ CheckOut } />
              <Route exact path="/orderconfirm" component={ OrderConfirmation } />
              <Route exact path="/check-login" component={ CheckLogin } />
              <Route exact path="/login" component={ UAuth } />
              <Route exact path="/register" component={ RegisterUser } />
              <Route exact path="/account" component={ Account } />
              <Route exact path="/orders" component={ Account } />
              <Route exact path="/changepassword" component={ PasswordUpdateForm } />
              <Route path="/admin" component={ AdminPortal } />
              <Route exact path="/products/:id" component = { Product } />
            </Switch>
        </main>
      </div>
    );
  }
}
