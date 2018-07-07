import React from "react";
import { Flex } from "grid-styled";
import styled from "styled-components";

const Container = Flex.extend`
  flex-direction: column;
  flex-grow: 1;
`;

export const Section = Flex.extend`
  flex-direction: column;
  padding: 1em 2em;
  background: ${props =>
    props.backgroundMode === "gradient"
      ? `linear-gradient(
          to right, 
          ${props.theme.colors.primary} 20%, 
          ${props.theme.colors.secondary}
        )`
      : "transparent"};
`;

export const Title = styled.span`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transparentGrey};
  font-size: 1em;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &:after {
    margin-left: 1em;
    content: "";
    flex-grow: 1;
    height: 0.1em;
    background-color: ${props => props.theme.colors.transparentGrey};
  }
`;

export default Container;
