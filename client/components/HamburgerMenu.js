import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store';
import { NavItems } from './Nav';

const HamburgerMenu = (props) => {
  const { visible } = props;
  const navbarOpen = visible ? 'menu open' : 'menu';
  const hamburgerClass = 'menu-items list-unstyled';

  return (
    <div className={ navbarOpen }>
      <NavItems { ...props } className={ hamburgerClass } />
    </div>
  );
}

const mapState = ({ currentUser }) => ({ currentUser });
const mapDispatch = { logoutUser };

export default connect(mapState, mapDispatch)(HamburgerMenu);
