import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BuyCurrency extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        symbol: PropTypes.string.isRequired
      })
    })
  }
  
  render() {
    const symbol = this.props.match.params.symbol;
    return (
      <div>
        -- BuyCurrency {symbol} --
      </div>
    );
  }
}
