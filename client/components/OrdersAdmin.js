import React from 'react'
import { Link } from 'react-router-dom'

import formatDate from './helpers/formatDate'
import OrderStatusUpdateForm from './OrderStatusUpdateForm'

export default function ({ orders }) {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3>Orders</h3>
      </div>

      <div className='panel-body'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Placed on</th>
                <th>Customer name</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                orders.map(order =>
                  <tr key={ order.id }>
                    <td><Link to={ `/admin/orders/${order.id}` }>{ order.id }</Link></td>
                    <td>{ formatDate(order.createdAt) }</td>
                    <td>{ order.user.name }</td>
                    <td><Link to={ `/admin/orders/${order.id}` }>Details</Link></td>
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
