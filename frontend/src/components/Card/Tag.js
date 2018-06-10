import React from "react";
import styled from "styled-components";
import { Flex } from "grid-styled";

const Container = Flex.extend`
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.dark};
  font-size: 0.8rem;
  border-radius: 1em;
  padding: 0 0.8em 0 0.8em;
  position: relative;
  margin: 0 0.6em 0 0;
  align-items: center;
  line-height: 1.3rem;
`;

export const TagName = styled.span``;

export default ({ children }) => (
  <Container>
    <TagName>{children}</TagName>
  </Container>
);
