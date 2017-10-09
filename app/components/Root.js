import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchProducts } from '../store';

// Components
import Nav from './Nav';
import UserAuth from './UserAuth'
import AllProducts from './AllProducts';

export default class Root extends Component {
  componentDidMount () {
    store.dispatch(fetchProducts());
  }

  render () {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav } />
      
        {/* can be moved to different component, here for testing */}
        <Route component={ UserAuth }/>
      
        <main className="container">
          <h1 style={{ marginBottom: '30px' }}>Welcome to GraceShopper!</h1>
          <div className="row">
            <Switch>
              <Route exact path="/products" component={ AllProducts } />
              {/* <Route component={ Cart } /> */}
              <Redirect exact path="/" to="/products" />
            </Switch>
          </div>
        </main>
      </div>
    )
  }
}
