import React from 'react';
import { connect } from 'react-redux';

import Orders from './Orders'
import AccountUpdateForm from './AccountUpdateForm'

const Account = ({ currentUser, orders }) => {
  orders = orders.filter(order => order.id && !order.isCart)

  return (
    <div>
      <div className="panel panel-default">
        <h4 className='panel-heading'>Account Details</h4>
        <div className='panel-body'>
          <AccountUpdateForm user={ currentUser }/>
        </div>
      </div>

      <Orders orders={ orders } />
    </div>
  )
};

const mapState = ({ currentUser, orders }) => ({ currentUser, orders });

export default connect(mapState)(Account);
