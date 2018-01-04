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
  renderItem: PropTypes.func.isRequired,
  delayInterval: PropTypes.number,
  initialDelay: PropTypes.number
};

DelayList.defaultProps = {
  initialDelay: 0,
  delayInterval: 1000
};

export default DelayList;
