import React from "react";
import styled, { css } from "styled-components";
import { Flex } from "grid-styled";

export const StatsTitle = styled.span`
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  font-size: 0.8em;
`;

const containerStyleAccordingToDirection = ({ direction, titlePosition }) => {
  let titleAlignment = "center";
  let titleMargin = "1em 0 0";
  let alignItems = "inherit";

  switch (direction) {
    default:
    case "column":
      if (titlePosition === "topLeft") {
        titleAlignment = "left";
        titleMargin = "0 0 1em";
      }

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

export const StatsFloatingContent = Flex.extend`
  flex-direction: column;
  padding: 1em;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: left;
  align-items: flex-start;
  justify-content: center;
`;

export const StatsContainer = styled(
  ({
    padded,
    bordered,
    titlePosition,
    backgroundMode,
    direction,
    ...otherProps
  }) => <Flex {...otherProps} />
)`
  position: relative;
  flex-direction: column;

  ${props =>
    props.padded &&
    css`
      border-bottom: 0.05em solid rgba(255, 255, 255, 0.05);
    `};
  ${props =>
    props.bordered &&
    css`
      padding: 1em;
    `};

  ${props =>
    props.backgroundMode === "dark" &&
    css`
      background-color: rgba(0, 0, 0, 0.4);
    `};

  ${props => props.direction !== 'none' && containerStyleAccordingToDirection(props)};
`;

StatsContainer.defaultProps = {
  padded: true,
  bordered: true,
  direction: "column",
  titlePosition: "default",
};
