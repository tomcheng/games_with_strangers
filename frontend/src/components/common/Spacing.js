import PropTypes from "prop-types";

const Spacing = ({ children, spaceBottom, spaceTop }) =>
  children({
    spacingStyle: { marginBottom: spaceBottom * 8, marginTop: spaceTop * 8 }
  });

Spacing.propTypes = {
  children: PropTypes.func.isRequired,
  spaceBottom: PropTypes.oneOf([0, 0.5, 1, 2, 3]),
  spaceTop: PropTypes.oneOf([0, 0.5, 1, 2, 3])
};

Spacing.defaultProps = {
  spaceBottom: 0,
  spaceTop: 0
};

export default Spacing;
