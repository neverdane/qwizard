import React from "react";
import styled, { css } from "styled-components";
import { Flex } from "grid-styled";

export const StatsTitle = styled.span`
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  font-size: 0.8em;
`;

const containerStyleAccordingToDirection = props => {
  const direction = props.direction || "column";
  let titleAlignment = "center";
  let titleMargin = "1em 0 0";
  let alignItems = "inherit";

  switch (direction) {
    default:
    case "column":
      break;
    case "row":
      titleAlignment = "left";
      titleMargin = 0;
      alignItems = "center";

      break;
    case "row-reverse":
      titleAlignment = "right";
      titleMargin = 0;
      alignItems = "center";

      break;
  }

  return css`
    flex-direction: ${direction};
    align-items: ${alignItems};

    ${StatsTitle} {
      text-align: ${titleAlignment};
      margin: ${titleMargin};
    }
  `;
};

export const StatsContainer = styled(({ direction, ...otherProps }) => (
  <Flex {...otherProps} />
))`
  border-bottom: 0.05em solid rgba(255, 255, 255, 0.05);
  padding: 1em;

  ${props => containerStyleAccordingToDirection(props)};
`;
