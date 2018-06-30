import React from "react";
import SvgLogo from "./Logo";
import { Flex } from "grid-styled";
import Menu from "./Menu";

const Container = Flex.extend`
  width: 17em;
  flex-direction: column;
  flex-shrink: 0;
  background: ${props => props.theme.colors.dark};
`;

export default ({ children, ...props }) => {
  return (
    <Container {...props}>
    </Container>
  );
};
