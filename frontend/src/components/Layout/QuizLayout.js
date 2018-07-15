import React from "react";
import { Flex } from "grid-styled";
import SvgLogo from "./Logo";
import StreamLoader from "../Stream/StreamLoader";

const Layout = Flex.extend`
  height: 100%;
`;

const Header = Flex.extend`
  height: 30%;
  width: 100%;
  background: ${props => props.theme.colors.dark};
  justify-content: center;
  padding-top: 2em;
  position: absolute;
`;

const Logo = SvgLogo.extend`
  width: 5.4em;
  height: 5.4em;
  fill: ${props => props.theme.colors.transparentWhite};
`;

export default ({ children, ...props }) => {
  return (
    <Layout {...props}>
      <Header>
        <Logo color="white" />
      </Header>
      <StreamLoader />
      {children}
    </Layout>
  );
};
