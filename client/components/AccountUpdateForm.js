import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateAccount } from '../store';

class UserAuth extends Component {
  constructor(props) {
    super(props)
    const { user } = props
    this.state = {
      name: user.name || '',
      email: user.email || '',
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
    const { name, email } = this.state
    this.props.updateAccount({ name, email })
  }

  render() {
    const { user } = this.props
    const { email, name } = this.state
    const { onChangeHandler, onUpdateHandler } = this

    if (!user.userId) return <div></div>

    return (
      <form onSubmit={ onUpdateHandler } className='well'>
        <h4>Account</h4>

        <div className='form-group'>
          <Link className='btn btn-default' to='/changepassword'>Change password</Link>
        </div>

        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' value={ email } onChange={ onChangeHandler } className="form-control" />
        </div>

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
