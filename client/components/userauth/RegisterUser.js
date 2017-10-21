import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser, registerGuest, loginUser } from '../../store';

import queryParser from '../helpers/queryParser'

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
    this.onRegister = this.onRegister.bind(this);
  }

  componentDidMount() {
    const email = queryParser(this.props.location.search).get('email')
    if (email) this.setState({ email, guest: true })
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onRegister(ev) {
    ev.preventDefault()
    const { registerUser, registerGuest, loginUser, history } = this.props
    const { email, password, guest } = this.state
    guest ?
      registerGuest(this.state)
        .then(() => loginUser(email, password))
        .then(() => history.push('/account'))
      :
      registerUser(this.state)
        .then(() => loginUser(email, password))
        .then(() => history.push('/account'))
  }

  render() {
    const { name, email, password } = this.state
    const { onChange, onRegister } = this

    return (
      <form onSubmit={ onRegister } className='well'>
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
    )
  }
}

const mapDispatch = { registerUser, registerGuest, loginUser }

export default connect(null, mapDispatch)(RegisterUser)
