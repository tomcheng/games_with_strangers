import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import Chip from "./Chip";

const chipSource = {
  beginDrag: props => ({ chipId: props.chipId })
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class DraggableChip extends Component {
  static propTypes = {
    chipId: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    const { connectDragSource, isDragging, className, style } = this.props;

    return connectDragSource(
      <div
        style={{ ...style, display: isDragging ? "none" : null }}
        className={className}
      >
        <Chip />
      </div>
    );
  }
}

export default DragSource("CHIP", chipSource, collect)(DraggableChip);
