import React, {Component} from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getWallet } from '../../store/actions/walletActions';
import {
  CurrenciesTable,
  WalletTable
} from '../.';

class Dashboard extends Component {
 
  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    getWallet: PropTypes.func.isRequired,
    rates: PropTypes.shape({
      publicationDate: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        unit: PropTypes.number.isRequired,
        purchasePrice: PropTypes.number.isRequired,
        sellPrice: PropTypes.number.isRequired,
        averagePrice: PropTypes.number.isRequired
      })).isRequired
    }),
    profile: PropTypes.shape({
      isLaoded: PropTypes.bool,
      hasWallet: PropTypes.bool
    }),
    wallet: PropTypes.shape({
      balance: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
      }))
    })
  };

  componentDidMount() {
    if (this.props.isSignIn) this.props.getWallet();
  }

  render() {
    const { isSignIn, rates: {publicationDate: pubDate, items: rates, error }, profile, wallet } = this.props;
    if (!isSignIn) return (<Redirect to="/sign-in" />);
    return (
      <div className="container">
        <div className="row">
          {error ? 'Sorry but currenty our service is available.' : (
      <>
        <div className="col s12 m6">
          { rates && <CurrenciesTable pubDate={pubDate} rates={rates} />}
        </div>
        <div className="col s12 m6">
          <div className="section">
            <header><h5>My Wallet</h5></header>
            { profile.isLoaded && (profile.hasWallet ? 
              <WalletTable rates={rates} wallet={wallet} /> : 
              <div className={styles.center}>
                <h6>You don&apos;t have currenty wallet. Click button below to create it.</h6> 
                <Link to='/create-wallet'>
                  <button className="btn-small grey">Create wallet</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
          )}
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty),
  rates: state.rates,
  profile: state.fb.profile,
  wallet: state.wallet
});

const mapDispatchToProps = (dispatch) => ({
  getWallet: () => dispatch(getWallet())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
