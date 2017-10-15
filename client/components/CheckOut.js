import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkOut } from '../store';
import Cart from './Cart'

class CheckOut extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      paymentInfo: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value }))
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    this.props.checkOut(this.state)
  }

  render() {
    const { address, paymentInfo } = this.state
    const { onChangeHandler, onSubmitHandler } = this

    return (
      <div>
        <Cart />
        <form onSubmit={ onSubmitHandler } class='panel panel-primary'>
          <div class='panel-heading'>Check out</div>
          <div class='panel-body'>
            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <input name='address' value={ address } onChange={ onChangeHandler } className='form-control'/>
            </div>

            <div className='form-group'>
              <label htmlFor='paymentInfo'>Payment Info</label>
              <input name='paymentInfo' value={ paymentInfo } onChange={ onChangeHandler } className='form-control'/>
            </div>

            <button className='btn btn-success'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = { checkOut }

export default connect(null, mapDispatch)(CheckOut)
