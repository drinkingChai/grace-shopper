import React from 'react';
import { connect } from 'react-redux';
import { checkOut } from '../store';
import CartUpdateForm from './CartUpdateForm';

const Cart = (props) => {
  const {order} = props; // { order } above

  if (!order) return <div />

  const total = order.lineitems.reduce((total, item)=> (total += item.product.price * item.quantity), 0);

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <strong>Your Cart</strong>
      </div>
      <div className="panel-body">
      {/* enter Order Lines Here */}
      {
        order.lineitems.map(lineitem => <CartUpdateForm key={ lineitem.product.id } lineitem={ lineitem } />)
      }
      <hr />
      <form onSubmit={ props.placeOrder }>
        <label>Subtotal:</label> ${ total }
        <button className="btn btn-primary btn-sm pull-right">Proceed to Checkout</button>
      </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    order: state.orders.find(order => order.isCart === true)
  }
};

const mapDispatch = dispatch => ({
  placeOrder(ev) {
    ev.preventDefault();
    dispatch(checkOut());
  }
});

export default connect(mapStateToProps, mapDispatch)(Cart);
