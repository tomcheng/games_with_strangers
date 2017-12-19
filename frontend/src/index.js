import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Socket } from "phoenix";
import registerServiceWorker from "./registerServiceWorker";

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const socket = new Socket(`${WEBSOCKET_URL}/socket`);
socket.connect();

const channel = socket.channel("room:123", {});

channel.on("new_msg", msg => console.log("Got message", msg));

channel
  .join()
  .receive("ok", ({ messages }) => console.log("catching up", messages))
  .receive("error", ({ reason }) => console.log("failed join", reason))
  .receive("timeout", () => console.log("Networking issue. Still waiting..."));

setTimeout(() => {
  channel
    .push("new_msg", { body: "NEW MESSAGE!" }, 10000)
    .receive("ok", msg => console.log("created message", msg))
    .receive("error", reasons => console.log("create failed", reasons))
    .receive("timeout", () => console.log("Networking issue..."));
}, 2000);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
registerServiceWorker();
