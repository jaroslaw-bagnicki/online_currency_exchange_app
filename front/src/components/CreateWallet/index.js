import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class CreateWallet extends Component {
  state = {
    pln: '',
    isForeignDeposit: false
  }

  static propTypes = {
    isSignIn: PropTypes.bool.isRequired
  };

  currencies = [
    { symbol: 'USD', unit: 1 },
    { symbol: 'EUR', unit: 1 },
    { symbol: 'CHF', unit: 1 },
    { symbol: 'RUB', unit: 100 },
    { symbol: 'CZK', unit: 100 },
    { symbol: 'GBP', unit: 1 }
  ];

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit()', this.state);
  }

  toggleForeignDeposite = () => {
    const foreignCurrenciesState = this.currencies.reduce((prev, curr) => {
      prev[curr.symbol.toLowerCase()] =  '';
      return prev;
    }, {});
    this.setState({
      isForeignDeposit: true,
      ...foreignCurrenciesState
    });
  }

  renderForeignCurrenciesFields() {
    return (
      <>
        {this.currencies.map((curr, index) => (
          <div key={index} className="input-field">
            <label htmlFor={curr.symbol.toLowerCase()}>{curr.symbol} deposit</label>
            <input 
              type="number" 
              id={curr.symbol.toLowerCase()} 
              value={this.state[curr.symbol.toLowerCase()]} 
              onChange={this.handleChange} />
          </div>
        ))}
      </>
    );
  }

  render() {
    const { isSignIn } = this.props;
    if (!isSignIn) return (<Redirect to="/sign-in" />);
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <form onSubmit={this.handleSubmit} className="section">
              <h5 className="grey-text text-darken-3">Initial deposite</h5>
              <div className="input-field">
                <label htmlFor="pln"> PLN deposit</label>
                <input type="number" id="pln" value={this.state.pln} onChange={this.handleChange} />
              </div>
              { this.state.isForeignDeposit && this.renderForeignCurrenciesFields() }
              <div>
                { !this.state.isForeignDeposit &&  (<button className="btn grey" onClick={this.toggleForeignDeposite}>Add foreign deposit</button>)}
                <button type="submit" className="btn grey right">Create wallet</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty)
});

export default connect(mapStateToProps)(CreateWallet);
