import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import CartUpdateForm from './CartUpdateForm';

const Cart = ({ order, location }) => {
  if (!order) return <div />

  const total = order.lineitems.reduce((total, item)=> (total += item.product.price * item.quantity), 0);

  return (
    <div className="panel panel-default">
      <h4 className="panel-heading">Your Cart</h4>
      <div className="panel-body">
        { order.lineitems.map(lineitem => <CartUpdateForm key={ lineitem.product.id } lineitem={ lineitem } />) }
        <hr/>
        <label>Subtotal:</label> ${ total }
      </div>
    </div>
  )
}

const mapStateToProps = ({ orders }) => ({
  order: orders.find(order => order.isCart === true)
})

export default connect(mapStateToProps)(Cart);