import React, { Component } from "react";
import styled from "styled-components";
import { DragLayer } from "react-dnd";
import Chip from "./Chip";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

class ChipDragLayer extends Component {
  render() {
    const { isDragging, currentOffset, itemType, ...other } = this.props;

    if (!isDragging || itemType !== "CHIP" || !currentOffset) {
      return null;
    }

    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

    return (
      <Container
        style={{ pointerEvents: "none", transform, WebkitTransform: transform }}
      >
        <Chip {...other} />
      </Container>
    );
  }
}

const collect = monitor => ({
  ...monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
  currentOffset: monitor.getSourceClientOffset()
});

export default DragLayer(collect)(ChipDragLayer);
