import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser } from '../../store';

class UserAuth extends Component {
  // can be presentational
  constructor() {
    super()
    this.state = { email: '', password: '' };
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onLogin(ev) {
    ev.preventDefault()
    const { email, password } = this.state
    this.props.loginUser(email, password)
      .then(() => this.props.history.goBack())
      .catch(err => {
        if (err.response.data == 'password change required') return this.props.history.push('/changepassword')
      })
  }

  render() {
    const { email, password } = this.state
    const { onChange, onLogin } = this

    return (
      <div className='well'>
        <form onSubmit={ onLogin }>
          <h4>Account</h4>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' value={ email } onChange={ onChange } className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' value={ password } onChange={ onChange } className="form-control" />
          </div>
          <button className="btn btn-default">Login</button>
          <hr/>
        </form>

        <Link to='/register'>Register</Link>
        <div>
            <div className="back-line">
              <span>or</span>
            </div>
          </div>
          <div>
            <p>
              <a
                target="_self"
                href="/api/auth/google"
                className="btn btn-social btn-google">
                <i className="fa fa-google" />
                <span>Login with Google</span>
              </a>
            </p>
          </div>
      </div>
    )
  }
}

const mapDispatch = { loginUser }

export default withRouter(connect(null, mapDispatch)(UserAuth))
