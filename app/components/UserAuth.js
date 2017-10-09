import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkSession, loginUser, logoutUser } from '../store'

class UserAuth extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '' }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onLoginHandlher = this.onLoginHandlher.bind(this)
    this.onLogoutHandler = this.onLogoutHandler.bind(this)
  }

  componentDidMount() {
    this.props.checkSession()
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

  onLogoutHandler(ev) {
    ev.preventDefault()
    this.props.logoutUser()
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
const mapDispatch = { checkSession, loginUser, logoutUser }

export default connect(mapState, mapDispatch)(UserAuth)
