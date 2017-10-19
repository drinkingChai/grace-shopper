import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeOrderStatus } from '../store'

class OrderStatusUpdateForm extends Component {
  constructor() {
    super()
    this.state = { status: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ status: this.props.order.status })
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    const { order, changeOrderStatus } = this.props
    changeOrderStatus(order.id, this.state)
  }

  render() {
    const { onChange, onSubmit } = this
    const { status } = this.state

    // change to fetch statuses from server
    return (
      <form className='form-inline' onSubmit={ onSubmit }>
        <select className='form-control' name='status' value={ status } onChange={ onChange }>
          <option value={ 'CREATED' }>CREATED</option>
          <option value={ 'PROCESSING' }>PROCESSING</option>
          <option value={ 'SHIPPED' }>SHIPPED</option>
          <option value={ 'DELIVERED' }>DELIVERED</option>
          <option value={ 'CANCELLED' }>CANCELLED</option>
        </select>
        &nbsp;
        <button className='btn btn-info'>Update</button>
      </form>
    )
  }
}

const mapDispatch = { changeOrderStatus }

export default connect(null, mapDispatch)(OrderStatusUpdateForm)
