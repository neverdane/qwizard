import React from "react";
import styled from "styled-components";
import { Transition } from "react-spring";
import { Container } from "./Question";

export const WAITING_LINE_LENGTH = 3;

export default styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  z-index: 0;

  ${Container}:nth-child(2) {
    position: absolute;
    margin-top: 1em;
    width: 68%;
    z-index: -1;
  }
`;
