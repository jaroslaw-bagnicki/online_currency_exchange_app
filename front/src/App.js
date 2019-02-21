import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { 
  Navbar,
  Dashboard,
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
            <Route exact path="/register" component={Register} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/create-wallet" component={CreateWallet} />
            <Route exact path="/buy/:symbol" component={BuyCurrency} />
            <Route exact path="/sell/:symbol" component={SellCurrency} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
