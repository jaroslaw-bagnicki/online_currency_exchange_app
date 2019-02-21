import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class SellCurrency extends Component {
  static propTypes = {
    isSignIn: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        symbol: PropTypes.string.isRequired
      })
    })
  }

  render() {
    const { isSignIn } = this.props;
    if (!isSignIn) return (<Redirect to="/sign-in" />);
    const symbol = this.props.match.params.symbol;
    return (
      <div>
        -- SellCurrency {symbol} --
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignIn: !(state.fb.auth.isEmpty)
});

export default connect(mapStateToProps)(SellCurrency);
