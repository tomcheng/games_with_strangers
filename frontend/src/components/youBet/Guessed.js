import React, { Fragment } from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../utils/customTypes";
import { makeList } from "../../utils/strings";
import SecondaryText from "../common/SecondaryText";
import Heading from "../common/Heading";

const Guessed = ({ yourGuess, awaitingGuess }) => (
  <Fragment>
    <Heading level={3} center>You Answered: {yourGuess}</Heading>
    <SecondaryText center>
      Waiting for {makeList(awaitingGuess.map(p => p.name))}&hellip;
    </SecondaryText>
  </Fragment>
);

Guessed.propTypes = {
  yourGuess: PropTypes.number.isRequired,
  awaitingGuess: customTypes.players.isRequired
};

export default Guessed;
