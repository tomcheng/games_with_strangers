import React from "react";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 24px;
  font-family: Roboto, sans-serif;
  color: #fff;
  border-radius: 3px;
  height: 60px;
  padding: 0 15px;
  margin: 15px 0;
`;

const TextInput = props => (
  <Input {...props} type="text" />
);

export default TextInput;