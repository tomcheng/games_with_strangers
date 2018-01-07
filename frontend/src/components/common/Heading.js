import React from "react";
import PropTypes from "prop-types";
import Spacing from "./Spacing";

const Heading = ({ children, level, spaceBottom, spaceTop, center }) => {
  const style = { textAlign: center ? "center" : null };
  const Comp = "h" + level;

  return (
    <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
      {({ spacingStyle }) => (
        <Comp style={{ ...spacingStyle, ...style }}>{children}</Comp>
      )}
    </Spacing>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
  level: PropTypes.oneOf([1, 3]),
  spaceBottom: PropTypes.number,
  spaceTop: PropTypes.number,
};

Heading.defaultProps = {
  spaceBottom: 1,
  level: 1
};

export default Heading;
