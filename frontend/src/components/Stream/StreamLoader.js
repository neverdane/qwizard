import React from "react";
import StreamSvg from "./Stream";
import styled from "styled-components";
import {Flex} from "grid-styled";
import LogoIcon from "../Layout/LogoIcon";

const Wrapper = Flex.extend`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Stream = styled(StreamSvg)`
  position: absolute;
  transition: opacity 700ms 200ms;
  opacity: ${props => props.loading ? 0 : 1};
`;

const RightStream = Stream.extend`
  right: -50%;
`;

const Logo = styled(LogoIcon)`
  @keyframes rotate {
    0% {opacity:1; transform: rotate(0deg);}
    25% { transform: rotate(90deg)}
    50% {opacity: 0.1; transform: rotate(180deg) ;}
    75% { transform: rotate(270deg) }
    100% {opacity:1; transform: rotate(360deg) }
  }

  height: 12em;
  position: absolute;
  z-index: 0;
  fill: ${props => props.theme.colors.primary};
  animation : rotate 2s infinite forwards;
  transform-origin: 49% 48%;
  width: 12em;
`;

export default ({loading = false}) => {
  return (
    <Wrapper>
      <Stream loading={loading}/>
      <Logo />
      <RightStream loading={loading} position="right"/>
    </Wrapper>
  );
};
