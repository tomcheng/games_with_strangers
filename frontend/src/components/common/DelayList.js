import React from "react";
import PropTypes from "prop-types";
import DelayShow from "./DelayShow";

const DelayList = ({ list, renderItem, initialDelay, delayInterval }) =>
  list.map((item, index) => (
    <DelayShow key={index} delay={initialDelay + index * delayInterval}>
      {renderItem(item)}
    </DelayShow>
  ));

DelayList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  delayInterval: PropTypes.number,
  initialDelay: PropTypes.number,
  renderItem: PropTypes.func
};

DelayList.defaultProps = {
  initialDelay: 0,
  delayInterval: 1000,
  renderItem: a => a
};

export default DelayList;
