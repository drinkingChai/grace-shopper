import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store'

const Nav = ({ currentUser, logoutUser }) => {
  return (
    <nav className="navbar navbar-default">
      <div className='container-fluid'>
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">GraceShopper</Link>
        </div>
        <ul className="nav navbar-nav pull-right">
          <li><Link to="#">Search <span className="glyphicon glyphicon-search" /></Link></li>
          { currentUser.userId ?
            <li><Link to="/account">My Account</Link></li> :
            <li><Link to="/login">Log In</Link></li> }
          { currentUser.userId && currentUser.isAdmin ?
            <li><Link to="/admin">Admin</Link></li> : null }
          { currentUser.userId ?
            <li><Link to="/" onClick={ logoutUser }>Log out</Link></li> : null }
        </ul>
      </div>
    </nav>
  )
}

const mapState = ({ currentUser }) => ({ currentUser })
const mapDispatch = { logoutUser }

export default connect(mapState, mapDispatch)(Nav);
