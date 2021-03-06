import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from './helpers/formatDate';

const Orders = ({ orders }) => {
  orders = orders.filter(order => !order.isCart);

  return (
    <div className="panel panel-default">
      <h4 className="panel-heading">Orders</h4>
      <div className="panel-body">
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Placed on</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {
                orders.map(order => (<tr key={ order.id }>
                    <td><Link to={ `/orders/${order.id}` }>{ order.id }</Link></td>
                    <td>{ formatDate(order.createdAt) }</td>
                    <td>{ order.status }</td>
                    <td><Link to={ `/orders/${order.id}` }>Details</Link></td>
                  </tr>)
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
