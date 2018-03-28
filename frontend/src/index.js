import React from "react";
import { render } from "react-dom";
import "./index.css";
import { ThemeProvider } from "styled-components";
import AppContainer from "./components/AppContainer";
// import registerServiceWorker from "./registerServiceWorker";

render(
  <ThemeProvider theme={{ appPadding: 24 }}><AppContainer /></ThemeProvider>,
  document.getElementById("root")
);

// registerServiceWorker();
