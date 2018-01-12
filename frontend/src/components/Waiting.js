import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { pluralize } from "../utils/strings";
import Heading from "./common/Heading";
import SectionHeader from "./common/SectionHeader";
import Button from "./common/Button";
import SecondaryText from "./common/SecondaryText";
import Select from "./common/Select";

class Waiting extends Component {
  static propTypes = {
    gameName: PropTypes.string.isRequired,
    moderatorName: PropTypes.string.isRequired,
    others: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    playersNeeded: PropTypes.number.isRequired,
    youAreModerator: PropTypes.bool.isRequired,
    yourName: PropTypes.string.isRequired,
    onStartGame: PropTypes.func.isRequired,
    gameOptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired
          })
        ).isRequired,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      })
    )
  };

  constructor(props) {
    super();

    const { gameOptions } = props;

    this.state = {
      config: gameOptions
        ? gameOptions.reduce(
            (acc, opt) => ({
              ...acc,
              [opt.name]: opt.defaultValue
            }),
            {}
          )
        : {}
    };
  }

  handleChange = ({ target }) => {
    const { gameOptions } = this.props;
    const { config } = this.state;
    const newValue =
      typeof gameOptions.find(opt => opt.name === target.name).defaultValue ===
      "number"
        ? parseInt(target.value, 10)
        : target.value;

    this.setState({ config: { ...config, [target.name]: newValue } });
  };

  handleStartGame = () => {
    this.props.onStartGame(this.state.config);
  };

  render() {
    const {
      gameName,
      yourName,
      others,
      playersNeeded,
      youAreModerator,
      moderatorName,
      gameOptions
    } = this.props;
    const { config } = this.state;

    return (
      <Fragment>
        <SectionHeader>About to Play: {gameName}</SectionHeader>
        <Heading center>{yourName}</Heading>
        {others.map(player => (
          <Heading key={player.id} center>
            {player.name}
          </Heading>
        ))}
        {!!playersNeeded && (
          <SecondaryText spaceTop={3} center>
            Waiting for {playersNeeded} more{" "}
            {pluralize("player", playersNeeded)}&hellip;
          </SecondaryText>
        )}
        {youAreModerator &&
          playersNeeded === 0 && (
            <Fragment>
              {gameOptions &&
                gameOptions.map(({ name, options }) => (
                  <Select
                    key={name}
                    value={config[name]}
                    onChange={this.handleChange}
                    name={name}
                    options={options}
                    spaceTop={2}
                    center
                  />
                ))}
              <Button
                spaceTop={gameOptions ? 2 : 3}
                onClick={this.handleStartGame}
                center
              >
                Start Game
              </Button>
            </Fragment>
          )}
        {!playersNeeded &&
          !youAreModerator && (
            <SecondaryText spaceTop={3} center>
              Waiting for {moderatorName} to start game&hellip;
            </SecondaryText>
          )}
      </Fragment>
    );
  }
}

export default Waiting;
