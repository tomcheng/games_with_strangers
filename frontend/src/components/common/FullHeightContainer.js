import React, { Component } from "react";
import PropTypes from "prop-types";

const MARGIN_BOTTOM = 24;

class FullHeightContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  state = {
    heightDifference: null
  };

  componentDidMount() {
    this.setState({
      heightDifference: this.containerEl.offsetTop + MARGIN_BOTTOM
    });
  }

  containerEl = null;

  render() {
    const { children, className } = this.props;
    const { heightDifference } = this.state;

    return (
      <div
        className={className}
        ref={el => {
          this.containerEl = el;
        }}
        style={{
          opacity: heightDifference ? 1 : 0,
          height: heightDifference
            ? `calc(100vh - ${heightDifference}px)`
            : "auto"
        }}
      >
        {children}
      </div>
    );
  }
}

export default FullHeightContainer;
