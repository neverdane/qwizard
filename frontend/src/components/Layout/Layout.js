import React from "react";
import styled from "styled-components";

export default styled(props => {
  return <div {...props} />;
})`
  background-color: ${props => props.theme.colors.black};
  min-height: 100%;
  padding: 5em;
`;
