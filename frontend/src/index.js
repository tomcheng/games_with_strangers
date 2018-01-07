import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "styled-components";
import AppContainer from "./components/AppContainer";
// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <ThemeProvider theme={{ appPadding: "24px" }}><AppContainer /></ThemeProvider>,
  document.getElementById("root")
);

// registerServiceWorker();
