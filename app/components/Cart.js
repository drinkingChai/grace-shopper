import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      { order.lineitems.map(lineitem => (
        <p key={ lineitem.id }>{ lineitem.product.name } x { lineitem.quantity }</p> ))}
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
