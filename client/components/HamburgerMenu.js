import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store';
import { NavItems } from './Nav';

class HamburgerMenu extends Component {
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
    const { currentUser, logoutUser } = this.props;
    const navbarOpen = visible ? 'menu open' : 'menu';

    return (
      <div className={ navbarOpen }>
        <NavItems { ...this.props } className={ 'menu-items list-unstyled' } />
      </div>
    );
  }
}

const mapState = ({ currentUser }) => ({ currentUser });
const mapDispatch = { logoutUser };

export default connect(mapState, mapDispatch)(HamburgerMenu);
