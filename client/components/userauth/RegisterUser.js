import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser, loginUser } from '../../store';

class RegisterUser extends Component {
  // can be presentational
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onLogin(ev) {
    ev.preventDefault()
    const { registerUser, loginUser, history } = this.props
    const { email, password } = this.state
    registerUser(this.state)
      .then(() => loginUser(email, password))
      .then(() => history.push('/account'))
  }

  render() {
    const { name, email, password } = this.state
    const { onChange, onLogin } = this

    return (
      <div>
        <form onSubmit={ onLogin } className='well'>
          <h4>Account</h4>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' value={ email } onChange={ onChange } className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input name='name' value={ name } onChange={ onChange } className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' value={ password } onChange={ onChange } className="form-control" />
          </div>

          <button className="btn btn-default">Register</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = { registerUser, loginUser }

export default connect(null, mapDispatch)(RegisterUser)
