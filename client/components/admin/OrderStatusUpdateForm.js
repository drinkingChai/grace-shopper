import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeOrderStatus } from '../../store'

import validStatuses from '../helpers/validStatuses'

class OrderStatusUpdateForm extends Component {
  constructor() {
    super()
    this.state = { statusInput: '' }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ statusInput: this.props.order.status })
  }

  onChange(ev) {
    const { name, value } = ev.target
    this.setState({ [name]: value })
  }

  onSubmit(ev) {
    ev.preventDefault()
    const { order, changeOrderStatus } = this.props
    const { statusInput } = this.state
    changeOrderStatus(order.id, { status: statusInput })
  }

  render() {
    const { onChange, onSubmit } = this
    const { statusInput } = this.state

    return (
      <form className='form-inline' onSubmit={ onSubmit }>
        <select className='form-control' name='statusInput' value={ statusInput } onChange={ onChange }>
          { validStatuses.map(status => <option key={ status } value={ status }>{ status }</option>) }
        </select>
        &nbsp;
        <button className='btn btn-info'>Update</button>
      </form>
    )
  }
}

const mapDispatch = { changeOrderStatus }

export default connect(null, mapDispatch)(OrderStatusUpdateForm)
