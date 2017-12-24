import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

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
`;

const TextInput = ({ label, name, ...props }) => (
  <div>
    {label && <Label htmlFor={name}>{label}</Label>}
    <Input {...props} name={name} type="text" />
  </div>
);

export default TextInput;