import React from "react";
import styled from "styled-components";
import {Transition} from "react-spring";
import {Container} from "./Question";

export const WAITING_LINE_LENGTH = 3;

export default styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 0;
  margin-top: -25em;

  ${Container}[data-stage-position="0"]:nth-child(1) {
    z-index: 1;
  }

  ${Container}[data-stage-position="0"]:nth-child(2) {
    z-index: 0;
  }

  ${Container}[data-stage-position="1"] {
    background: grey;
    position: absolute;
    margin-top: 0.75em;
    width: 68%;
    z-index: -1;
  }
  
  ${Container}[data-stage-position="2"] {
    position: absolute;
    margin-top: 1.5em;
    width: 66%;
  }

  ${Container}[data-stage-position="2"]:nth-child(3) {
    z-index: -2;
  }

  ${Container}[data-stage-position="2"]:nth-child(4) {
    z-index: -3;
  }
`;
