import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import Chip from "./Chip";

const chipSource = {
  beginDrag: props => ({
    amount: props.amount,
    base: props.base,
    chipId: props.chipId,
    color: props.color
  }),
  endDrag: (props, monitor) => {
    const { onCancelBet, chipId, base } = props;
    const didDrop = monitor.didDrop();

    if (!didDrop && onCancelBet) {
      onCancelBet({ chipId, base })
    }
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class DraggableChip extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    base: PropTypes.bool.isRequired,
    chipId: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDraggable: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    onCancelBet: PropTypes.func
  };

  static defaultProps = {
    isDraggable: true
  };

  render() {
    const {
      connectDragSource,
      isDragging,
      className,
      style,
      isDraggable,
      ...other
    } = this.props;

    if (!isDraggable) {
      return (
        <div className={className} style={style}>
          <Chip {...other} />
        </div>
      );
    }

    return connectDragSource(
      <div
        style={{ ...style, display: isDragging ? "none" : null }}
        className={className}
      >
        <Chip {...other} />
      </div>
    );
  }
}

export default DragSource("CHIP", chipSource, collect)(DraggableChip);
