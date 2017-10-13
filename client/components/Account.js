import React from 'react';
import { connect } from 'react-redux';

const Account = ({ orders }) => {
  return (
    <div className="col-xs-12 col-sm-4">
      { orders.map(order => (
        <div key={ order.id } className="panel panel-default">
          <div className="panel-heading">Placed on: { order.updatedAt }</div>

          <div className="panel-body">
            { order.lineitems.map(li => (
              <div key={ li.id }>{ li.product.name } x { li.quantity } ... { li.quantity * li.product.price }</div>))}
            <hr/>
            <label>Total:</label> { order.lineitems.reduce((total, item)=> (total += item.product.price * item.quantity), 0) }
          </div>
        </div>))}
    </div>
  )
};

const mapState = ({ orders }) => ({ orders });

export default connect(mapState)(Account);
