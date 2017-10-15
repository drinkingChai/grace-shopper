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
    // change this confirmation page
      .then(() => this.props.history.push('/account'))
      .catch(err => console.log(err.message))
  }

  render() {
    const { order } = this.props
    const { address, paymentInfo } = this.state
    const { onChangeHandler, onSubmitHandler } = this

    return (
      <div>
        <Cart />

        { order && order.lineitems.length ?
          <form onSubmit={ onSubmitHandler } className='panel panel-primary'>
            <div className='panel-heading'><h2>Check out</h2></div>
            <div className='panel-body'>
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
          </form> : null }
      </div>
    )
  }
}

const mapState = ({ orders }) => ({
  order: orders.find(order => order.isCart)
})
const mapDispatch = { checkOut }

export default connect(mapState, mapDispatch)(CheckOut)
