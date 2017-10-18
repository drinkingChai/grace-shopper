import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../store';

class UserAuth extends Component {
  // can be presentational
  constructor() {
    super()
    this.state = { email: '', password: '', name: '' };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onLoginHandlher = this.onLoginHandlher.bind(this);
    this.onRegisterHandler = this.onRegisterHandler.bind(this);
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value }))
  }

  onLoginHandlher(ev) {
    ev.preventDefault()
    const { email, password } = this.state
    this.props.loginUser(email, password)
      .then(() => this.props.history.push('/account'))
      .catch(err => {
        if (err.response.data == 'password change required') return this.props.history.push('/changepassword')
        console.log(err)
      })
  }

  onRegisterHandler(ev) {
    ev.preventDefault()
    const { name, email, password } = this.state
    this.props.registerUser({ name, email, password })
      .then(() => this.props.loginUser(email, password))
      .catch(err => console.log(err.message))
  }

  render() {
    const { email, password, name } = this.state
    const { onChangeHandler, onLoginHandlher, onRegisterHandler } = this

    return (
      <div className="well">
        <form onSubmit={ onLoginHandlher }>
          <h4>Account</h4>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' value={ email } onChange={ onChangeHandler } className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' value={ password } onChange={ onChangeHandler } className="form-control" />
          </div>
          <button className="btn btn-default">Login</button>
          <hr/>

          <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input name='name' value={ name } onChange={ onChangeHandler } className="form-control" />
          </div>
          <button onClick={ onRegisterHandler } className="btn btn-default">Register and Login</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = { loginUser, registerUser }

export default connect(null, mapDispatch)(UserAuth)
