import React from "react";
import styled, { css } from "styled-components";
import theme from "../../theme";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/fontawesome-pro-light/index";
import { Spring } from "react-spring";
import { animated } from "react-spring";

const Container = styled(({ isFocused, ...otherProps }) => (
  <section {...otherProps} />
))`
  background-color: ${props => props.theme.colors.dark};
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 3em -1em;

  &:before {
    height: 0.2rem;
    top: 0;
    right: 0;
    display: block;
    content: "";
    position: absolute;
    transition: all 600ms ease-out;
    background-color: ${props => props.theme.colors.blue};
    width: ${props => (props.isFocused ? "100%" : 0)}
    opacity: ${props => (props.isFocused ? 1 : 0)}
`;

const rowStyles = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  &:not(:first-of-type) {
    margin-top: 1.3rem;
  }
`;

export const Row = styled.div`
  ${rowStyles};
`;
export const AnimatedRow = styled(animated.div)`
  ${rowStyles};
`;

const Zip = styled(({ isOpen, ...otherProps }) => (
  <aside {...otherProps}>
    <FontAwesomeIcon icon={faAngleDown} color={theme.colors.dark} />
  </aside>
))`
  position: absolute;
  top: 0;
  height: 3rem;
  width: 3rem;
  right: 0;
  overflow: hidden;

  svg {
    position: absolute;
    top: 0.25rem;
    right: 0.35rem;
    ${props => props.isOpen && { transform: "rotate(180deg)" }};
    transition: transform 400ms;
  }

  &::before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${props => props.color || props.theme.colors.blue};
    transform: rotate(45deg);
    top: -50%;
    right: -50%;
  }
`;

export default ({
  isFocused = false,
  isZipDisplayed = true,
  isZipOpened = true,
  onZipClick = () => {},
  children
}) => (
  <Container isFocused={isFocused}>
    {isZipDisplayed && <Zip onClick={onZipClick} isOpen={isZipOpened} />}

    <Spring to={{ height: "auto" }}>
      {props => <div style={props}>{children}</div>}
    </Spring>
  </Container>
);
