import React, { Component } from 'react'
import { Route } from 'react-router-dom'

export default class Root extends Component {
  render() {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav }/>



      </div>
    )
  }
}
