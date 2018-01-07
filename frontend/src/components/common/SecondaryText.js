import styled from "styled-components";

const SecondaryText = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
  text-align: ${props => props.center ? "center" : "inherit"};
`;

export default SecondaryText;
