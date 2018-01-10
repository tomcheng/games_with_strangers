import React from "react";
import PropTypes from "prop-types";
import Spacing from "./Spacing";

const processString = str => str.replace(/'/g, "’");
const processPrompt = str => str.replace(/<BLANK>/g, "________");

const Heading = ({ children, level, spaceBottom, spaceTop, center, safe }) => {
  const style = { textAlign: center ? "center" : null };
  const Comp = "h" + level;

  return (
    <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
      {({ spacingStyle }) =>
        safe ? (
          <Comp
            style={{ ...spacingStyle, ...style }}
            dangerouslySetInnerHTML={{ __html: processPrompt(children) }}
          />
        ) : (
          <Comp style={{ ...spacingStyle, ...style }}>
            {typeof children === "string" ? processString(children) : children}
          </Comp>
        )
      }
    </Spacing>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
  level: PropTypes.oneOf([1, 3]),
  spaceBottom: PropTypes.number,
  spaceTop: PropTypes.number,
  safe: PropTypes.bool
};

Heading.defaultProps = {
  spaceBottom: 1,
  level: 1
};

export default Heading;
