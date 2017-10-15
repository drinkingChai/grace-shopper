import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import CartUpdateForm from './CartUpdateForm';

const Cart = ({ order, location }) => {
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
        <hr/>
        <div>
          <div>
            <label>Subtotal:</label> ${ total }
          </div>
          { location && location.pathname != '/checkout' && order.lineitems.length ?
            <Link to='/checkout' className="btn btn-primary btn-sm">Proceed to Checkout</Link> : null }
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
