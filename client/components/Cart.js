import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import CartUpdateForm from './CartUpdateForm';

const Cart = ({ order }) => {
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
        <div>
          <hr/>
          <label>Subtotal:</label> ${ total }
          <Link to='/checkout' className="btn btn-primary btn-sm pull-right">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    order: state.orders.find(order => order.isCart === true)
  }
};

export default connect(mapStateToProps)(Cart);
