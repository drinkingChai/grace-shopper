import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-default">
      <div className='container-fluid'>
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">GraceShopper</Link>
        </div>
        <ul className="nav navbar-nav pull-right">
          <li><Link to="#">Search <span className="glyphicon glyphicon-search" /></Link></li>
          { currentUser.userId ?
            <li><Link to="/account">Account</Link></li> :
            <li><Link to="#">Log In</Link></li> }
        </ul>
      </div>
    </nav>
  )
}

const mapState = ({ currentUser }) => ({ currentUser })

export default connect(mapState)(Nav);
