import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <Layout >
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/Auth" exact component={Auth} />
          <Route path="/Checkout" component={Checkout} />
          <Route path="/Orders" component={Orders} />
          <Route path="/logout" component={Logout} />

        </Switch>
      </Layout>
    );
  }
}

export default App;
