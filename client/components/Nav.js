import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store';
import HamburgerMenu from './HamburgerMenu';

class Nav extends Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(ev) {
    ev.preventDefault();
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { toggleMenu } = this;
    const navBarClass = 'nav navbar-nav pull-right navbar-hide';

    return (
      <nav className="navbar navbar-default" id="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand menu-icon" to="#" onClick={ toggleMenu }>
              <span className="glyphicon glyphicon-menu-hamburger" />
            </Link>
            <Link className="navbar-brand navbar-logo" to="/">GraceShopper</Link>
          </div>
          <NavItems { ...this.props } className={ navBarClass } />
          <HamburgerMenu { ...this.props } { ...this.state } toggleMenu={ toggleMenu } />
        </div>
      </nav>
      );
  }
}

export const NavItems = ({ currentUser, logoutUser, className }) => {
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
