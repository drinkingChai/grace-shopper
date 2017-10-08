import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserAuth extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '' }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onLoginHandlher = this.onLoginHandlher.bind(this)
    this.onLogoutHandler = this.onLogoutHandler.bind(this)
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value }))
  }

  onLoginHandlher(ev) {
    ev.preventDefault()
  }

  onLogoutHandler(ev) {
    ev.preventDefault()
  }

  render() {
    const { currentUser } = this.props
    const { email, password } = this.state
    const { onChangeHandler, onLoginHandlher, onLogoutHandler } = this

    return (
      <div>

        <form onSubmit={ onLoginHandlher }>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' value={ email } onChange={ onChangeHandler }/>

          <label htmlFor='password'>Password</label>
          <input name='password' type='password' value={ password } onChange={ onChangeHandler }/>

          <button>Login</button>
        </form>

        <form onSubmit={ onLogoutHandler }>
          <h4>{ currentUser.name }</h4>
          <button>Logout</button>
        </form>

      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ currentUser })

export default connect(mapState)(UserAuth)
