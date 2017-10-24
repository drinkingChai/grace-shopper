import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store';

const Nav = (props) => {
  return (
    <nav className="navbar navbar-default" id="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">GraceShopper</Link>
        </div>
        <NavItems { ...props } className={ 'nav navbar-nav pull-right' } />
      </div>
    </nav>
  );
};

const NavItems = ({ currentUser, logoutUser, className }) => {
  return (
    <ul className={ className }>
      {
        currentUser.userId ?
        <li><Link to="/account">My Account</Link></li> :
        <li><Link to="/login">Log In</Link></li>
      }
      {
        currentUser.userId && currentUser.isAdmin ?
        <li><Link to="/admin">Admin</Link></li> : null
      }
      {
        currentUser.userId ?
        <li><Link to="/" onClick={ logoutUser }>Log out</Link></li> : null
      }
    </ul>
  );
};

const mapState = ({ currentUser }) => ({ currentUser });
const mapDispatch = { logoutUser };

export default connect(mapState, mapDispatch)(Nav);
