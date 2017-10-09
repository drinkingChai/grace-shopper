import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchProducts } from '../store';

// Components
import Nav from './Nav';
import AllProducts from './AllProducts';


export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchProducts());
  }

  render() {
    return (
      <div className="container">
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav } />
        <main>
          <h1>GraceShopper</h1>
          <section className="col-xs-12">
            <Switch>
              <Route path="/products" component={ AllProducts } />
              {/* <Route component={ Cart } /> */}
              <Redirect to="/products" />
            </Switch>
          </section>
        </main>
      </div>
    )
  }
}
