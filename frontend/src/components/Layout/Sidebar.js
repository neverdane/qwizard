import React from "react";
import { Flex } from "grid-styled";

const Container = Flex.extend`
  width: 17em;
  flex-direction: column;
  flex-shrink: 0;
  background: ${props => props.theme.colors.dark};
`;

export default Container;
