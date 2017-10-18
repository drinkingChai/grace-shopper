import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers } from '../store'

import AdminNav from './AdminNav'
import UsersAdmin from './UsersAdmin'
import ProductsAdmin from './ProductsAdmin'
import OrdersAdmin from './OrdersAdmin'

class AdminPortal extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <h3>Admin portal</h3>
        <hr/>

        <AdminNav />

        <Route path='/admin/users' component={ UsersAdmin } />
        <Route path='/admin/products' component={ ProductsAdmin } />
        <Route path='/admin/orders' component={ OrdersAdmin } />
      </div>
    )
  }
}

const mapDispatch = { fetchUsers }

export default connect(null, mapDispatch)(AdminPortal)
