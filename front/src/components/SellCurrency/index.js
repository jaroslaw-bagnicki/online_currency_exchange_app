import React, { Component } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWallet } from '../../store/actions/walletActions';
import { startProcessingOrder, placeOrder, cancelOrder, orderError, clearError } from '../../store/actions/orderActions';
export class SellCurrency extends Component {

  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    getWallet: PropTypes.func.isRequired,
    startProcessingOrder: PropTypes.func.isRequired,
    placeOrder: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
    orderError: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    }),
    rates: PropTypes.shape({
      rates: PropTypes.shape({
        publicationDate: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          code: PropTypes.string.isRequired,
          unit: PropTypes.number.isRequired,
          sellPrice: PropTypes.number.isRequired
        })).isRequired
      })
    }),
    wallet: PropTypes.shape({
      balance: PropTypes.number
    }),
    order: PropTypes.shape({
      isProcessing: PropTypes.bool,
      error: PropTypes.string
    })
  }

  state = {
    type: 'sell',
    code: this.props.match.params.code,
    quantity: 0
  }

  handleChange = (quantity, price, unit, ownedCurrency) => {
    if (quantity < 0) {
      this.props.orderError('Quantity must be positive number!');
      this.setState({
        quantity: 0,
        price
      });
    } else if (Math.floor(quantity) !== quantity) {
      this.props.orderError('Quantity must be round number!');
      this.setState({
        quantity: Math.floor(quantity),
        price
      });
    } else if (quantity > ownedCurrency) {
      this.props.orderError('Transaction amount can not be greater than the balance!');
      this.setState({
        quantity: ownedCurrency,
        price
      });
    } else {
      this.props.clearError();
      this.setState({
        quantity,
        unit,
        price
      });
    }
  }

  componentDidMount() {
    this.props.getWallet();
  }
  
  render() {
    const { isSignIn, rates, wallet: { items }, order: {isProcessing, isConfirmed, error, message } } = this.props;
    const code = this.props.match.params.code;
    const ownedCurrency = items.find(item => item.code === code);
    const currency = rates.items.find(item => item.code === code);
    const volume = this.state.quantity * currency.unit;
    const amount = (this.state.quantity * currency.purchasePrice).toFixed(2);
    if (!isSignIn) return (<Redirect to="/sign-in" />);
    
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="section">
              <h5 className="grey-text text-darken-3">Sell {currency.name} currency</h5>
              <div className="input-field">
                <label className="active" htmlFor="rate">Exchange rate per unit</label>
                <input type="number" id="rate" value={currency.sellPrice} disabled />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="unit">Unit multiple</label>
                <input type="number" id="unit" value={currency.unit} disabled />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="quantity">Quantity fo units</label>
                <input type="number" id="quantity" value={this.state.quantity} onChange={(e) => this.handleChange(Number.parseFloat(e.target.value), currency.purchasePrice, currency.unit, ownedCurrency.amount)} />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="amount">Transaction volume</label>
                <input type="number" id="volume" value={volume} disabled />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="amount">Transaction amount</label>
                <input type="number" id="amount" value={amount} disabled />
              </div>
              <div className="input-field">
                <label className="active" htmlFor="ownedCurrency">Owned currency</label>
                <input type="number" id="ownedCurrency" value={ownedCurrency && ownedCurrency.amount || 0} disabled />
              </div>
              <button className="btn red" onClick={this.props.cancelOrder} disabled={!isProcessing || isConfirmed}>Cancel</button>
              <button className="btn green" onClick={() => this.props.placeOrder(this.state)} disabled={!isProcessing || isConfirmed}>Confirm</button>
              <button type="submit" className="btn grey right" onClick={this.props.startProcessingOrder} disabled={isProcessing}>
                <span className={styles.buttonContent}>Place order { isProcessing && <i className="fas fa-spinner fa-spin"></i> }</span>
              </button>
              <div className={styles.alert}>
                { error && <p className="red-text center">{error}</p>}
                { message && <p className="green-text center">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.props.clearError();
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty),
  order: state.order,
  rates: state.rates,
  wallet: state.wallet
});

const mapDispatchToProps = (dispatch) => ({
  getWallet: () => dispatch(getWallet()),
  startProcessingOrder: () => dispatch(startProcessingOrder()),
  placeOrder: (orderData) => dispatch(placeOrder(orderData)),
  cancelOrder: () => dispatch(cancelOrder()),
  orderError: (errorMsg) => dispatch(orderError({message: errorMsg})),
  clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(SellCurrency);
