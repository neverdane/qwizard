import React from "react";
import styled from "styled-components";
import { Flex } from "grid-styled";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faCommentDots,
  faTags,
  faChartPie
} from "@fortawesome/fontawesome-pro-light/index";

const Item = Flex.extend`
  width: 6.7em;
  height: 6.7em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  opacity: ${props => (props.active ? 1 : 0.5)};
  cursor: pointer;
  transition: opacity 400ms;
  position: relative;

  &:after {
    background: ${props => props.theme.colors.darkPrimary};
    width: 0.7em;
    height: 0.7em;
    display: block;
    position: absolute;
    right: 0.15em;
    content: "";
    transform: rotate(45deg);
    transition: right 400ms;
  }

  &:hover {
    opacity: 1;

    &:after {
      right: -0.35em;
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-bottom: 0.4rem;
  font-size: 1.6em;
`;

const SmallIcon = Icon.extend`
  font-size: 1.3em;
`;

const Label = styled.span`
  font-size: 0.9em;
`;

export default ({ children, ...props }) => {
  return (
    <div {...props}>
      <Item active>
        <Icon icon={faDesktop} color="rgba(0, 0, 0, 0.6)" />
        <Label>Dashboard</Label>
      </Item>
      <Item>
        <Icon icon={faCommentDots} color="rgba(0, 0, 0, 0.6)" />
        <Label>Questions</Label>
      </Item>
      <Item>
        <SmallIcon icon={faTags} color="rgba(0, 0, 0, 0.6)" />
        <Label>Labels</Label>
      </Item>
      <Item>
        <Icon icon={faChartPie} color="rgba(0, 0, 0, 0.6)" />
        <Label>Stats</Label>
      </Item>
    </div>
  );
};
