import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkSession, loginUser, registerUser, logoutUser } from '../store'

class UserAuth extends Component {
  constructor() {
    super()
    this.state = { email: '', password: '', name: '' }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onLoginHandlher = this.onLoginHandlher.bind(this)
    this.onRegisterHandler = this.onRegisterHandler.bind(this)
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
      <div>
        { !currentUser.userId ?
          <form onSubmit={ onLoginHandlher }>
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' value={ email } onChange={ onChangeHandler }/>

            <label htmlFor='password'>Password</label>
            <input name='password' type='password' value={ password } onChange={ onChangeHandler }/>

            <button>Login</button>

            <div>
              <label htmlFor='name'>Name</label>
              <input name='name' value={ name } onChange={ onChangeHandler }/>
              <button onClick={ onRegisterHandler }>Register</button>
            </div>
          </form> 
          :
          <form onSubmit={ onLogoutHandler }>
            <h4>{ currentUser.name }</h4>
            <button>Logout</button>
          </form> }
      </div>
    )
  }
}

const mapState = ({ currentUser }) => ({ currentUser })
const mapDispatch = { checkSession, loginUser, registerUser, logoutUser }

export default connect(mapState, mapDispatch)(UserAuth)
