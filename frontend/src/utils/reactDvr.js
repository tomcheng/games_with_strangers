import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";

const ReactDVR = ({
  isShowing,
  isOverriding,
  onSaveProps,
  onToggleOverriding
}) =>
  isShowing ? (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            value={isOverriding}
            onChange={onToggleOverriding}
          />{" "}
          Is overriding
        </label>
      </div>
      <button onClick={onSaveProps}>Save Props</button>
    </div>
  ) : (
    <noscript />
  );

const defaultOptions = {
  toggleKeyCode: "Backquote",
  localStorageKey: "__react-dvr-props__"
};

const reactDvr = options => Target =>
  class extends Component {
    componentDidMount() {
      window.addEventListener("keyup", this.handleKeyUp);
      this.renderOverlay();
    }

    componentDidUpdate() {
      this.renderOverlay();
    }

    componentWillUnmount() {
      window.removeEventListener("keyup", this.handleKeyUp);
      unmountComponentAtNode(this.overlayTarget);
    }

    options = { ...defaultOptions, ...options };

    handleKeyUp = event => {
      if (event.code === this.options.toggleKeyCode) {
        this.setLocalStorageState(state => ({ ...state, isShowingUI: !state.isShowingUI }));
      }
    };

    handleSaveProps = () => {
      localStorage.setItem(
        this.options.localStorageKey,
        JSON.stringify(this.props)
      );
    };

    handleToggleOverriding = () => {
      this.setLocalStorageState(state => ({
        ...state,
        isOverriding: !state.isOverriding
      }));
    };

    getLocalStorageState = () => {
      const json = localStorage.getItem(this.options.localStorageKey);
      return json ? JSON.parse(json) : {};
    };

    setLocalStorageState = updates => {
      const json = localStorage.getItem(this.options.localStorageKey);
      const currentState = json ? JSON.parse(json) : {};
      const newState =
        typeof updates === "function"
          ? updates(currentState)
          : { ...currentState, ...updates };

      localStorage.setItem(
        this.options.localStorageKey,
        JSON.stringify(newState)
      );

      this.forceUpdate();
    };

    renderOverlay = () => {
      if (!document.body) {
        return;
      }

      const { isShowingUI, isOverriding } = this.getLocalStorageState();

      if (!this.overlayTarget) {
        this.overlayTarget = document.createElement("div");
        document.body.appendChild(this.overlayTarget);
      }

      render(
        <ReactDVR
          isShowing={isShowingUI}
          isOverriding={isOverriding}
          props={this.props}
          onSaveProps={this.handleSaveProps}
          onToggleOverriding={this.handleToggleOverriding}
        />,
        this.overlayTarget
      );
    };

    render() {
      const { isOverriding } = this.getLocalStorageState();
      const json = localStorage.getItem(this.options.localStorageKey);
      const propsOverride =
        json && isOverriding ? JSON.parse(json) : {};

      return <Target {...this.props} {...propsOverride} />;
    }
  };

export default reactDvr;
