import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers, fetchAllOrders } from '../store'

import AdminNav from './AdminNav'
import UsersAdmin from './UsersAdmin'
import ProductsAdmin from './ProductsAdmin'
import SearchableOrdersAdmin from './SearchableOrdersAdmin'
import Order from './Order'

class AdminPortal extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchAllOrders()
  }

  render() {
    const { allOrders, currentUser } = this.props

    return (
      <div>
        <h3>Admin portal</h3>
        <hr/>

        <AdminNav />

        <Route path='/admin/users' component={ UsersAdmin } />
        <Route path='/admin/products' component={ ProductsAdmin } />
        <Route exact path='/admin/orders' component={ SearchableOrdersAdmin } />

        {/* a bit messy, clean it up by having Order use fetch instead of filter? */}
        <Route exact path='/admin/orders/:id' render={ (ownProps) => (
          <Order
            order={ allOrders.find(order => order.id == ownProps.match.params.id) }
            currentUser={ currentUser }/>
        )}/>
      </div>
    )
  }
}

const mapState = ({ allOrders, currentUser }) => ({ allOrders, currentUser })
const mapDispatch = { fetchUsers, fetchAllOrders }

export default connect(mapState, mapDispatch)(AdminPortal)
