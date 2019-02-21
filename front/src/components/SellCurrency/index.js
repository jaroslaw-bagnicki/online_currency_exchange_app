import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SellCurrency extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        symbol: PropTypes.string.isRequired
      })
    })
  }

  render() {
    return (
      <div>
        -- SellCurrency component --
      </div>
    );
  }
}
