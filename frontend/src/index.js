import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GET } from "./utils/api";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

GET("/test");
