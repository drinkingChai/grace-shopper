import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import formatDate from './helpers/formatDate'
import OrderStatusUpdateForm from './admin/OrderStatusUpdateForm'

const Order = ({ order, currentUser }) => {
  if (!order) return <div></div>

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <strong>Placed on:</strong> { formatDate(order.createdAt ) }

        { currentUser && currentUser.isAdmin ?
          <OrderStatusUpdateForm order={ order }/> :
          <label className='pull-right'><strong>Status:</strong> <kbd>{ order.status }</kbd></label> }
      </div>

      <div className="panel-body">
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {
                order.lineitems.map(lineitem => (
                  <tr key={ lineitem.id }>
                    <td><Link to={ `/products/${lineitem.product.id}` }>{ lineitem.product.name }</Link></td>
                    <td>{ lineitem.quantity }</td>
                    <td>${ lineitem.quantity * lineitem.price }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <hr/>
        <label>Total:</label> ${ order.lineitems.reduce((total, item)=> (total += item.product.price * item.quantity), 0) }
      </div>

      <div className='panel-footer'>
        <label>Delivered to:</label>
        <br/>
        { order.address }
      </div>
    </div>
  )
};

const mapState = ({ orders, allOrders, currentUser }, ownProps) => ({
  order: currentUser.isAdmin ?
    allOrders.find(_order => _order.id == ownProps.match.params.id) :
    orders.find(_order => _order.id == ownProps.match.params.id),
  currentUser
})

export default connect(mapState)(Order)
