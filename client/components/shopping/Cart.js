import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CartUpdateForm from './CartUpdateForm';

const Cart = ({ order, history }) => {
  if (!order) return <div />

  const total = order.lineitems.reduce((total, item) => (total += item.product.price * item.quantity), 0);
  const { pathname } = history.location;
  const setId = pathname == '/cart' ? 'bag' : 'cart';

  return (
    <div className="col-xs-12 col-sm-8 col-lg-3 panel panel-default" id={ setId }>
      <h2 className="panel-heading">Your Cart</h2>
      <div className="panel-body">
        {
          !order.lineitems.length ? <p>No items in your cart.</p> :
            order.lineitems.map(lineitem => {
              return <CartUpdateForm key={ lineitem.product.id } lineitem={ lineitem } />
            })
        }
        <hr />
        <label>Subtotal:</label> ${ total }

        {
          pathname !== '/checkout' ? <Link to="/check-login"><button className="btn btn-primary btn-sm pull-right">Checkout</button></Link> : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({ orders }) => ({
  order: orders.find(order => order.isCart === true)
});

export default withRouter(connect(mapStateToProps)(Cart));
