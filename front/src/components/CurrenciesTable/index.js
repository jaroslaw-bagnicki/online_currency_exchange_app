import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const CurrenciesTable = ({pubDate, rates}) => (
  <div className="section">
    <header className={styles.header}>
      <h5>Currencies <span className={['grey-text', styles.pubDate].join(' ')}> ({new Date(pubDate).toLocaleString()})</span></h5>
    </header>
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Unit</th>
          <th>Value</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { rates.map((rate, index) => (
          <tr key={index}>
            <td>{rate.code}</td>
            <td>{rate.unit}</td>
            <td>{rate.sellPrice}</td>
            <td className={styles.actionCell}>
              <Link className="btn-small grey" to={`/buy/${rate.code}`}>Buy</Link>
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  </div>
);

CurrenciesTable.propTypes = {
  pubDate: PropTypes.string.isRequired,
  rates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    unit: PropTypes.number.isRequired,
    purchasePrice: PropTypes.number.isRequired,
    sellPrice: PropTypes.number.isRequired,
    averagePrice: PropTypes.number.isRequired
  })).isRequired
};
