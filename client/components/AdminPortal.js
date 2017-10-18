import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AdminNav from './AdminNav'
import UsersAdmin from './UsersAdmin'
import ProductsAdmin from './ProductsAdmin'
import OrdersAdmin from './OrdersAdmin'

export default class AdminPortal extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <AdminNav />

        <Route path='/admin/users' component={ UsersAdmin } />
        <Route path='/admin/products' component={ ProductsAdmin } />
        <Route path='/admin/orders' component={ OrdersAdmin } />
      </div>
    )
  }
}
