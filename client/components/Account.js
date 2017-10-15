import React from 'react';
import { connect } from 'react-redux';

const formatDate = (_date) => {
  const date = new Date(_date)
  return `${date.getMonth()}/${date.getDate()}/${date.getYear()}`
}

const Account = ({ orders }) => {
  orders = orders.filter(order => order.id && !order.isCart)

  return (
    <div className="panel panel-default">
      <h2 className='panel-heading'>Your Orders</h2>
      <div className='panel-body'>
        { orders.map(order => (
          <div key={ order.id } className="panel panel-default">
            <div className="panel-heading">
              <strong>Placed on:</strong> { formatDate(order.updatedAt ) }
              <label className='pull-right'><strong>Status:</strong> <kbd>{ order.status }</kbd></label>
            </div>

            <div className="panel-body">
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      order.lineitems.map(lineitem => (
                        <tr key={ lineitem.id }>
                          <td>{ lineitem.product.name }</td>
                          <td>{ lineitem.quantity }</td>
                          <td>${ lineitem.quantity * lineitem.price }</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <hr/>
              <label>Total:</label> ${ order.lineitems.reduce((total, item)=> (total += item.product.price * item.quantity), 0) }
            </div>

            <div className='panel-footer'>
              <label>Delivered to:</label>
              <br/>
              { order.address }
            </div>
          </div>))}
        </div>
    </div>
  )
};

const mapState = ({ orders }) => ({ orders });

export default connect(mapState)(Account);
