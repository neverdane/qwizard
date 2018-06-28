import React from "react";
import SvgLogo from "./Logo";
import { Flex } from "grid-styled";
import Menu from "./Menu";

const Container = Flex.extend`
  width: 6.7em;
  flex-direction: column;
  flex-shrink: 0;
  background: ${props => props.theme.colors.darkPrimary};
  z-index: 1;
`;

const LogoContainer = Flex.extend`
  height: 6.7em;
  background: ${props => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const Logo = SvgLogo.extend`
    width: 5.4em;
    height: 5.4em;
    fill: ${props => props.theme.colors.darkPrimary};
`;

export default ({ children, ...props }) => {
  return (
    <Container {...props}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Menu />
    </Container>
  );
};
