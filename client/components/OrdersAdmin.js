import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import OrderStatusUpdateForm from './OrderStatusUpdateForm'

const formatDate = (_date) => {
  const date = new Date(_date)
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}

const OrdersAdmin = ({ allOrders }) => {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3>Orders</h3>
      </div>

      {/* TODO: add filter via redux here */}
      {/* TODO: and a search bar */}
      
      <div className='panel-body'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Placed on</th>
                <th>Customer name</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
                allOrders.map(order =>
                  <tr key={ order.id }>
                    <td><Link to={ `/admin/orders/${order.id}` }>{ order.id }</Link></td>
                    {/* IDEA: filter to all orders placed on that date? */}
                    <td>{ formatDate(order.createdAt) }</td>
                    {/* IDEA: link to users and see their orders? */}
                    <td>{ order.user.name }</td>
                    <td><OrderStatusUpdateForm order={ order }/></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ allOrders }) => ({ allOrders })

export default connect(mapState)(OrdersAdmin)
