import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAccount } from '../store';

class UserAuth extends Component {
  constructor(props) {
    super(props)
    const { user } = props
    this.state = {
      name: user.name || '',
      email: user.email || '',
      oldPassword: '',
      password1: '',
      password2: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onUpdateHandler = this.onUpdateHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign(this.state, { ...nextProps.user }))
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value }))
  }

  onUpdateHandler(ev) {
    ev.preventDefault()
    //const { name, email, oldPassword, password1 } = this.state
    //this.props.updatedAccount({
      //name, email,
      //oldPassword, password: password1
    //})
    const { name, email } = this.state
    this.props.updateAccount({ name, email })
  }

  render() {
    const { user } = this.props
    const { email, oldPassword, password1, password2, name } = this.state
    const { onChangeHandler, onUpdateHandler } = this

    if (!user.userId) return <div></div>

    return (
      <form onSubmit={ onUpdateHandler } className='well'>
        <h4>Account</h4>
        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' value={ email } onChange={ onChangeHandler } className="form-control" />
        </div>

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
        <hr/>

        <div className="form-group">
          <label htmlFor='name'>Name</label>
          <input name='name' value={ name } onChange={ onChangeHandler } className="form-control" />
        </div>
        <hr/>

        <button className="btn btn-default">Update</button>
      </form>
    )
  }
}

const mapDispatch = { updateAccount }

export default connect(null, mapDispatch)(UserAuth)
