import { Socket } from "phoenix";

const API_URL = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const headers = () => ({
  Accept: "application/json",
  "Content-Type": "application/json"
});

const parseResponse = response =>
  response.json().then(json => (response.ok ? json : Promise.reject(json)));

const queryString = params => {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  return `${query.length ? "?" : ""}${query}`;
};

export const GET = (url, params = {}) =>
  fetch(`${API_URL}${url}${queryString(params)}`, {
    method: "GET",
    headers: headers()
  }).then(parseResponse);

export const POST = (url, data = {}) =>
  fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(parseResponse);

export const PATCH = (url, data) =>
  fetch(`${API_URL}${url}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(parseResponse);

export const DELETE = url =>
  fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: headers()
  }).then(parseResponse);

export const getChannel = ({ topic, params }) => {
  const socket = new Socket(`${WEBSOCKET_URL}/socket`, {});
  socket.connect();

  return socket.channel(topic, params);
};
