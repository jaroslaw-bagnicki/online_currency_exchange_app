import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CurrenciesTable,
  WalletTable
} from '../.';

const Dashboard = ({ rates: {PublicationDate: pubDate, Items: rates, error }, wallet }) => (
  <div className="container">
    <div className="row">
      {error ? 'Sorry but currenty our service is available.' : (
      <>
        <div className="col s12 m6">
          { rates && <CurrenciesTable pubDate={pubDate} rates={rates} />}
        </div>
        <div className="col s12 m6">
          { rates && wallet && <WalletTable rates={rates} wallet={wallet} />} 
        </div>
      </>
      )}
    </div>
  </div>
);

Dashboard.propTypes = {
  rates: PropTypes.shape({
    PublicationDate: PropTypes.string.isRequired,
    Items: PropTypes.arrayOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Code: PropTypes.string.isRequired,
      Unit: PropTypes.number.isRequired,
      PurchasePrice: PropTypes.number.isRequired,
      SellPrice: PropTypes.number.isRequired,
      AveragePrice: PropTypes.number.isRequired
    })).isRequired
  }),
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })).isRequired
  })
};

const mapStateToProps = (state) => ({
  rates: state.rates,
  wallet: state.wallet
});

export default connect(mapStateToProps)(Dashboard);
