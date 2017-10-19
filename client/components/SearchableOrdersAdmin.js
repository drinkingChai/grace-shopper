import React, { Component } from 'react'
import { connect } from 'react-redux'

import validStatuses from './helpers/validStatuses'
import Orders from './Orders'
import SearchBar from './SearchBar'

class SearchableOrdersAdmin extends Component {
  constructor() {
    super()
    this.state = { searchInput: '', statusInput: '' }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleSearch(searchInput) {
    this.setState({ searchInput })
  }

  handleFilter(ev) {
    this.setState({ statusInput: ev.target.value })
  }

  render() {
    const { allOrders } = this.props
    const { searchInput, statusInput } = this.state
    const { handleSearch, handleFilter } = this

    let ordersFiltered = allOrders.filter(order => (
      searchInput ? (
        String(order.id).includes(searchInput) ||
        order.user.name.toLowerCase().includes(searchInput.toLowerCase()) ) : true &&
      statusInput ? order.status == statusInput : true ))

    return (
      <div>
        <div className='row'>
          <div className='container'>
            <SearchBar searchInput={ searchInput } handleSearch={ handleSearch } />

            {/* status filter */}
            <div className='col-xs-3 col-sm-3'>
              <select className='form-control' name='status' value={ statusInput } onChange={ handleFilter }>
                <option value={ '' }>Status</option>
                { validStatuses.map(status => <option key={ status } value={ status }>{ status }</option>) }
              </select>
            </div>
          </div>
        </div>

        <hr/>

        <Orders orders={ ordersFiltered }/>
      </div>
    )
  }
}

const mapState = ({ allOrders }) => ({ allOrders })

export default connect(mapState)(SearchableOrdersAdmin)
