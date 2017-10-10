import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ order }) => {
  if (!order) return <div />;

  return (
    <div className="panel panel-default">
      <h3 className="panel-heading" style={{ margin: 0 }}>
        Your Cart
      </h3>
      <div className="panel-body">
        {/* enter Order Lines Here */}
        {/* order.lineitems.map(lineitem => <CartUpdateForm key={ lineitem.id } lineitem={ lineitem } />) */}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    order: state.orders.find(order => order.isCart === true)
  }
};

export default connect(mapStateToProps)(Cart);
