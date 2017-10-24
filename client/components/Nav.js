import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store';

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
    const { visible } = this.state;
    const navBarClass = 'nav navbar-nav pull-right navbar-hide';
    const navbarOpen = visible ? 'menu open' : 'menu';
    const hamburgerClass = 'menu-items list-unstyled';

    return (
      <nav className="navbar navbar-default" id="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand menu-icon" to="#" onClick={ toggleMenu }>
              <span className="glyphicon glyphicon-menu-hamburger" />
            </Link>
            <Link className="navbar-brand navbar-logo" to="/">RetroShopper</Link>
          </div>
          <div className="nav navbar-nav navbar-bag pull-right">
            <Link to="/cart"><span className="glyphicon glyphicon-shopping-cart" /></Link>
          </div>
          <NavItems { ...this.props } className={ navBarClass } />
          <div className={ navbarOpen }>
            <NavItems { ...this.props } className={ hamburgerClass } />
          </div>
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


// <HamburgerMenu { ...this.props } { ...this.state } toggleMenu={ toggleMenu } />
