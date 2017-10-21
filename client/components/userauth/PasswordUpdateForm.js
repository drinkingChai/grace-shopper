import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateUserPassword } from '../../store';

class PasswordUpdateForm extends Component {
  constructor(props) {
    super(props)
    const { user } = props
    this.state = {
      oldPassword: '',
      password1: '',
      password2: '',
      message: '',
      error: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this)
  }

  checkPasswordMatch() {
    const { password1, password2 } = this.state
    const error = password1 !== password2 ? "Passwords don't match!" : ''
    this.setState(Object.assign(this.state, { error }))
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value, message: '' }))
    this.checkPasswordMatch()
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    // check if passwords are equal
    const { oldPassword, password1 } = this.state
    this.props.updateUserPassword({ oldPassword, password: password1 })
      .then(() => this.setState(Object.assign(this.state, { message: 'Password successfully updated!', error: '' })))
      .catch(err => {
        const error = err.response.data.errors ? err.response.data.errors.map(e => e.message).join(', ') : err.response.data
        this.setState(Object.assign(this.state, { error, message: '' }))
      })
  }

  render() {
    const { oldPassword, password1, password2, message, error } = this.state
    const { onChangeHandler, onSubmitHandler } = this

    return (
      <form onSubmit={ onSubmitHandler } className='well'>
        {/* refactor this to different component for alerts and errors */}
        { message.length ?
            <div className='alert alert-success'>
              <div className="form-group">{ message }</div>
              <Link className='btn btn-default' to='/account'>Back to account</Link>
            </div> : null }

        { error.length ?
            <div className='alert alert-danger'>{ error }</div> : null }

        <div className="form-group">
          <label htmlFor='oldPassword'>Old password</label>
          <input name='oldPassword' type='password' value={ oldPassword } onChange={ onChangeHandler } className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor='password1'>New password</label>
          <input name='password1' type='password' value={ password1 } onChange={ onChangeHandler } className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor='password2'>Confirm password</label>
          <input name='password2' type='password' value={ password2 } onChange={ onChangeHandler } className="form-control" />
        </div>

        <button className="btn btn-default">Update</button>
      </form>
    )
  }
}

const mapDispatch = { updateUserPassword }

export default connect(null, mapDispatch)(PasswordUpdateForm)
