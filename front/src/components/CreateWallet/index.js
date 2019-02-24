import React, { Component } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createWallet, clearError } from '../../store/actions/walletActions';

export class CreateWallet extends Component {
  state = {
    pln: '',
    isForeignDeposit: false
  }

  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    hasWallet: PropTypes.bool,
    isProceeding: PropTypes.bool,
    error: PropTypes.string,
    createWallet: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      unit: PropTypes.number
    }))
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { isForeignDeposit, pln, ...currency } = this.state;
    const balance = Number.parseFloat(pln);
    const items = Object.entries(currency)
      .filter(item => item[1] !== '')
      .map(item => ({code: item[0], amount: Number.parseFloat(item[1])}));
    this.props.createWallet({ balance, items });
  }

  toggleForeignDeposite = () => {
    const foreignCurrenciesState = this.props.currencies.reduce((prev, curr) => {
      prev[curr.code] =  '';
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
        {this.props.currencies.map((curr, index) => (
          <div key={index} className="input-field">
            <label htmlFor={curr.code}>{curr.code} deposit</label>
            <input 
              type="number" 
              id={curr.code} 
              value={this.state[curr.code]} 
              onChange={this.handleChange} />
          </div>
        ))}
      </>
    );
  }

  render() {
    const { isSignIn, hasWallet, isProceeding, error } = this.props;
    if (!isSignIn) return (<Redirect to="/sign-in" />);
    if (hasWallet) return (<Redirect to="/" />);
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
                <button type="submit" className="btn grey right" disabled={isProceeding}>
                  <span className={styles.buttonContent}>Create Wallet { isProceeding && <i className="fas fa-spinner fa-spin"></i> }</span>
                </button>
                <div className={styles.alert}>{ error && <p className="red-text center">{error}</p>}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty),
  hasWallet: state.fb.profile.hasWallet,
  isProceeding: state.wallet.isProceeding,
  error: state.wallet.error,
  currencies: state.rates.items
});

const mapDispatchToProps = (dispatch) => ({
  createWallet: (initDeposite) => dispatch(createWallet(initDeposite)),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet);
