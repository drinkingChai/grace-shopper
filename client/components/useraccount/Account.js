import React from 'react';
import { connect } from 'react-redux';

import Orders from '../Orders';
import AccountUpdateForm from './AccountUpdateForm';

const Account = ({ currentUser, orders }) => {
  orders = orders.filter(order => order.id && !order.isCart);

  return (
    <div className="col-xs-12">
      <h3>Welcome, { currentUser.name }!</h3>
      <hr />
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <div className="panel panel-default">
            <h4 className="panel-heading">Account Details</h4>
            <div className="panel-body">
              <AccountUpdateForm user={ currentUser } />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-8">
          <Orders orders={ orders } />
        </div>
      </div>
    </div>
  );
};

const mapState = ({ currentUser, orders }) => ({ currentUser, orders });

export default connect(mapState)(Account);
