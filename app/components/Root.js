import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fetchProducts } from '../store';

// Components
import Nav from './Nav';
import AllProducts from './AllProducts';


export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchProducts());
  }

  render() {
    return (
      <div>
        {/* Nav wrapped in route so it can get histor, location etc.. */}
        <Route component={ Nav } />

        <main className="container">
          <h1>GraceShopper</h1>
          <section className="col-xs-12">
            <Route path="/products" component={ AllProducts } />
            {/* <Route component={ Cart } /> */}
            <Redirect to="/products" />
          </section>
        </main>
      </div>
    )
  }
}
