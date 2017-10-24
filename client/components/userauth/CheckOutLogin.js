import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import UAuth from './UAuth'

const CheckLogin = ({ currentUser, ownProps }) => {
  if (currentUser.userId) ownProps.history.push('/checkout');

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-8">
        <UAuth />
        <div className="col-xs-12 col-sm-4" id="guest">
          <Link to="/checkout?guest=1" className="btn btn-default form-control">Continue as Guest</Link>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ currentUser }, ownProps) => ({
  currentUser,
  ownProps
});

export default connect(mapState)(CheckLogin);
