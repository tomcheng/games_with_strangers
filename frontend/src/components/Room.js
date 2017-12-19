import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Room extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onSelectGame: PropTypes.func.isRequired,
  };

  handleClickBet = () => {
    this.props.onSelectGame("you_bet");
  };
  
  render () {
    const { code } = this.props;

    return (
      <Fragment>
        <div>{code}</div>
        <div>Select a game:</div>
        <div><button onClick={this.handleClickBet}>You Bet!</button></div>
      </Fragment>
    );
  }
}

export default Room;