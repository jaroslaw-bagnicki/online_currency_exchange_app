import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const WalletTable = ({ wallet, rates }) => {
  const walletItems = wallet.items.map(item => Object.assign(item, rates.find(rate => rate.code === item.code)));
  return (
    <>    
      { !wallet.isLoaded ? <h5 className={styles.loader}><i className="fas fa-spinner fa-spin"></i></h5> : (walletItems.length === 0) ? <h6>Currenty You don&apos;t have foreign currency.</h6> : (
        <>
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
                <td>{item.code}</td>
                <td>{item.purchasePrice}</td>
                <td>{item.amount}</td>
                <td>{(item.purchasePrice * item.amount).toFixed(2)}</td>
                <td className={styles.actionCell}>
                  <Link className="btn-small grey" to={`/sell/${item.code}`}>Sell</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.accountBalance}>Available PLN: {wallet.balance.toFixed(2)} zł</div></>
      )}
    </>
  );
};

WalletTable.propTypes = {
  wallet: PropTypes.shape({
    isLoaded: PropTypes.bool,
    isProceeding: PropTypes.bool,
    balance: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    }))
  }),
  rates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    unit: PropTypes.number.isRequired,
    purchasePrice: PropTypes.number.isRequired,
    sellPrice: PropTypes.number.isRequired,
    averagePrice: PropTypes.number.isRequired
  })).isRequired
};
