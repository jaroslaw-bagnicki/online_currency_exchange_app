import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { 
  Navbar,
  Dashboard,
  Profile,
  Register,
  SignIn,
  CreateWallet,
  BuyCurrency,
  SellCurrency
} from './components';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/create-wallet" component={CreateWallet} />
            <Redirect exact from='/buy' to='/'/>
            <Route exact path="/buy/:code" component={BuyCurrency} />
            <Redirect exact from='/sell' to='/'/>
            <Route exact path="/sell/:code" component={SellCurrency} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
