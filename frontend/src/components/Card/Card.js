import React from "react";
import styled, { css } from "styled-components";
import { animated } from "react-spring";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const rowStyles = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  &:not(:first-of-type) {
    margin-top: 0.8em;
  }
`;

export const Row = styled(animated.div)`
  ${rowStyles};
`;

export default ({ children }) => <Container>{children}</Container>;
