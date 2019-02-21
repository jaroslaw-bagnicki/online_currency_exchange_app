import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const WalletTable = ({ wallet, rates }) => {
  const walletItems = wallet.items.map(item => Object.assign(item, rates.find(rate => rate.Code === item.code)));
  return (
    <div className="section">
      <header>
        <h5>My Wallet</h5>
      </header>
      { (walletItems.length === 0) ? <h6>Currenty You don&apos;t have foreign currency.</h6> : (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Unit price</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {walletItems.map((item, index) => (
              <tr key={index}>
                <td>{item.Code}</td>
                <td>{item.PurchasePrice}</td>
                <td>{item.amount}</td>
                <td>{(item.PurchasePrice * item.amount).toFixed(2)}</td>
                <td className={styles.actionCell}>
                  <Link className="btn-small grey" to={`/sell/${item.Code}`}>Sell</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.accountBalance}>Available PLN: {wallet.balance.toFixed(2)} zł</div>
    </div>
  );
};

WalletTable.propTypes = {
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  rates: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Code: PropTypes.string.isRequired,
    Unit: PropTypes.number.isRequired,
    PurchasePrice: PropTypes.number.isRequired,
    SellPrice: PropTypes.number.isRequired,
    AveragePrice: PropTypes.number.isRequired
  })).isRequired
};
