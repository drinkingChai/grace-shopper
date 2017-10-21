import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkOut, fetchAllOrders } from '../store';
import Cart from './Cart'

class CheckOut extends Component {
  // can be presentational!
  constructor() {
    super()
    this.state = {
      address: '',
      paymentInfo: '',
      email: ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.guestCheckoutHandler = this.guestCheckoutHandler.bind(this)
  }

  onChangeHandler(ev) {
    const { name, value } = ev.target
    this.setState(Object.assign(this.state, { [name]: value }))
  }

  onSubmitHandler(ev) {
    ev.preventDefault()
    this.props.checkOut(this.state)
    // change this confirmation page
      .then(() => this.props.currentUser.isAdmin ? this.props.fetchAllOrders() : null)
      .then(() => this.props.history.push('/account'))
      .catch(err => console.log(err.message))
  }

  guestCheckoutHandler(ev) {
    ev.preventDefault()
    this.props.checkOut(this.state)
    // change this confirmation page
      //.then(() => this.props.history.push('/'))
      .then(() => {
        this.props.history.push({
          pathname: '/login',
          search: `?email=${this.state.email}`
        })
      })
      .catch(err => console.log(err.message))
  }

  render() {
    const { currentUser, order } = this.props
    const { address, paymentInfo, email } = this.state
    const { onChangeHandler, onSubmitHandler, guestCheckoutHandler } = this

    return (
      <div>
        <Cart />

        { order && order.lineitems.length ?
          <form onSubmit={ onSubmitHandler } className='panel panel-primary'>
            <h4 className='panel-heading'>Check Out</h4>
            <div className='panel-body'>
              <div className='form-group'>
                <label htmlFor='address'>Address</label>
                <input name='address' value={ address } onChange={ onChangeHandler } className='form-control'/>
              </div>

              <div className='form-group'>
                <label htmlFor='paymentInfo'>Payment Info</label>
                <input name='paymentInfo' value={ paymentInfo } onChange={ onChangeHandler } className='form-control'/>
              </div>

              { currentUser.userId ?
                  <button className='btn btn-success'>Submit Order</button> :
                  <div>
                    <hr/>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input name='email' type='email' value={ email } onChange={ onChangeHandler } className='form-control'/>
                    </div>

                    <button className='btn btn-success' onClick={ guestCheckoutHandler }>Guest checkout</button>
                    &nbsp;
                    <Link className='btn btn-success' to='/login'>Login</Link>
                  </div> }
            </div>
          </form> : null }
      </div>
    )
  }
}

const mapState = ({ currentUser, orders }) => ({
  currentUser,
  order: orders.find(order => order.isCart)
})
const mapDispatch = { checkOut, fetchAllOrders }

export default connect(mapState, mapDispatch)(CheckOut)
