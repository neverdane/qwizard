import React from "react";
import StreamSvg from "./Stream";
import styled from "styled-components";
import { Flex } from "grid-styled";
import LogoIcon from "./Layout/LogoIcon";

const Wrapper = Flex.extend`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Stream = styled(StreamSvg)`
  position: absolute;
`;

const RightStream = Stream.extend`
  right: -50%;
`;

const Logo = styled(LogoIcon)`
  height: 12em;
  position: absolute;
  z-index: 1;
  fill: ${props => props.theme.colors.primary};
`;

export default props => {
  return (
    <Wrapper>
      <Stream />
      <Logo />
      <RightStream position="right" />
    </Wrapper>
  );
};
