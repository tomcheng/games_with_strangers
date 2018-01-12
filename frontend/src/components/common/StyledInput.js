import styled from "styled-components";

const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: ${props =>
  props.hasError ? "rgba(255,0,0,0.2)" : "rgba(0, 0, 0, 0.3)"};
  border: 1px solid
    ${props => (props.hasError ? "rgba(220, 0, 0, 1)" : "rgba(0, 0, 0, 0.2)")};
  font-size: 24px;
  font-family: Roboto, sans-serif;
  color: #fff;
  border-radius: 3px;
  height: 60px;
  padding: 0 15px;
  margin-left: ${props => (props.center ? "auto" : 0)};
  margin-right: ${props => (props.center ? "auto" : 0)};
  text-align: ${props => (props.center ? "center" : "inherit")};
`;

export default StyledInput;
