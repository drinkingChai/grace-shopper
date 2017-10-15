import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession, loginUser, registerUser, logoutUser } from '../store';

class UserAuth extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '', name: '' };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onLoginHandlher = this.onLoginHandlher.bind(this);
    this.onRegisterHandler = this.onRegisterHandler.bind(this);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value }))
  }

  onLoginHandlher(ev) {
    ev.preventDefault()
    const { email, password } = this.state
    this.props.loginUser(email, password)
  }

  onRegisterHandler(ev) {
    ev.preventDefault()
    const { name, email, password } = this.state
    this.props.registerUser({ name, email, password })
      .then(() => this.props.loginUser(email, password))
  }

  onLogoutHandler(ev) {
    ev.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { currentUser } = this.props
    const { email, password, name } = this.state
    const { onChangeHandler, onLoginHandlher, onRegisterHandler, onLogoutHandler } = this

    return (
      <div className="well">
        { !currentUser.userId ?
          <form onSubmit={ onLoginHandlher } className="form form-horizontal">
            <h4>Account</h4>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor='email'>Email</label>
              <div className="col-sm-10">
                <input name='email' type='email' value={ email } onChange={ onChangeHandler } className="form-control" />
              </div>

              <label className="control-label col-sm-3" htmlFor='password'>Password</label>
              <div className="col-sm-6">
                <input name='password' type='password' value={ password } onChange={ onChangeHandler } className="form-control" />
              </div>
              <button className="btn btn-default">Login</button>
            </div>

            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor='name'>Name</label>
              <div className="col-sm-8 pull-right">
                <input name='name' value={ name } onChange={ onChangeHandler } className="form-control" />
              </div>
            </div>
            <button onClick={ onRegisterHandler } className="btn btn-default">Register</button>
          </form>
          :
          <form onSubmit={ onLogoutHandler }>
            <h4>Welcome, { currentUser.name }!</h4>
            <button className="btn btn-default">Logout</button>
          </form> }
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ currentUser })
const mapDispatch = { checkSession, loginUser, registerUser, logoutUser }

export default connect(mapState, mapDispatch)(UserAuth)
