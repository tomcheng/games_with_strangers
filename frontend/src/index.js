import React from "react";
import { render } from "react-dom";
import "./index.css";
import { ThemeProvider } from "styled-components";
import AppContainer from "./components/AppContainer";
// import registerServiceWorker from "./registerServiceWorker";

if (!Object.entries) {
  Object.entries = function(obj) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  };
}

render(
  <ThemeProvider theme={{ appPadding: 24 }}>
    <AppContainer />
  </ThemeProvider>,
  document.getElementById("root")
);

// registerServiceWorker();
