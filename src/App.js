import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from './HOC/Layout/Layout';
import BurgerBulider from './containers/BurgerBulider/BurgerBulider' ;

import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Logout from './containers/Authentication/Logout/Logout';
import { connect } from 'react-redux';
import asyncComponent from './HOC/asyncComponent/asyncComponent';
import * as actions from './store/actions/A-index';

const  asyncCheckout =asyncComponent(()=>{
  return import('./containers/Checkout/Chekout')
}) 
const  asyncAuth =asyncComponent(()=>{
  return import('./containers/Authentication/Auth')
}) 
const  asyncOrders =asyncComponent(()=>{
  return import('./containers/Orders/Orders')
}) 

class App extends Component {
  componentDidMount() {
    this.props.onauthCheckState()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBulider} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/Checkout" component={asyncCheckout} />
          <Route path="/Orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBulider} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className="App">
        {routes}
        <Layout>


        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onauthCheckState: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
