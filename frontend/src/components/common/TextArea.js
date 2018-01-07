import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImportedTextArea from "react-textarea-autosize";

const StyledTextarea = styled(ImportedTextArea)`
  display: block;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 24px;
  line-height: 32px;
  font-family: Roboto, sans-serif;
  color: #fff;
  border-radius: 3px;
  padding: 12px 15px;
`;

const TextArea = props => <StyledTextarea {...props} />;

TextArea.propTypes = {
  minRows: PropTypes.number
};

TextArea.defaultProps = { minRows: 2 };

export default TextArea;
