import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartUpdateForm from './CartUpdateForm'

const Cart = (props) => {
  const {order} = props;

  if (!order) return <div></div>

  return (

    <div className="panel panel-default">
      <div className="panel-heading">
        Your Cart
      </div>
      <div className="panel-body">
      {/* enter Order Lines Here */}
      { order.lineitems.map(lineitem => <CartUpdateForm key={ lineitem.id } lineitem={ lineitem }/>) }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    order: state.orders.find(order => order.isCart === true)
  }
}

export default connect(mapStateToProps)(Cart);
