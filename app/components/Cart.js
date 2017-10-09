import React, { Component } from 'react';
import { connect } from 'react-redux';

const Cart = (props) => {
  const {order} = props;

  return (

    <div className="panel panel-default">
      <div className="panel-heading">
        Your Cart
      </div>
      <div className="panel-body">
      {/* enter Order Lines Here */}
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
