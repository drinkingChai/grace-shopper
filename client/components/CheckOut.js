import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkOut } from '../store';

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
      <form onSubmit={ onSubmitHandler }>
        <label htmlFor='address'>Address</label>
        <input name='address' value={ address } onChange={ onChangeHandler }/>

        <label htmlFor='paymentInfo'>Payment Info</label>
        <input name='paymentInfo' value={ paymentInfo } onChange={ onChangeHandler }/>

        <button>Submit</button>
      </form>
    )
  }
}

const mapDispatch = { checkOut }

export default connect(null, mapDispatch)(CheckOut)
