import React from "react";
import styled from "styled-components";
import { Flex } from "grid-styled";
import theme from "../../theme/index";
import CountUp from "../utils/CountUp";

const Ring = styled.circle.attrs({
  cx: 21,
  cy: 21,
  r: 14
})`
  fill: transparent;
  stroke-width: 0.14em;
  stroke: rgba(255, 255, 255, 0.05);
`;

const Background = Ring.extend.attrs({
  r: 18.5
})`
  fill: transparent;
  stroke-width: 0;
`;

const Bar = Ring.extend.attrs({
  r: 15.7
})`
  stroke-width: 0.05em;
  transition: stroke 800ms;
  transform: rotate(-90deg);
  transform-origin: center center;
  stroke: ${props => props.color};
`;

const Score = styled.span`
  color: ${props => props.color};
  font-size: 0.9em;
  font-weight: 500;
  transition: color 800ms;
  position: absolute;

  &:after {
    content: "%";
    font-size: 0.3em;
    position: relative;
    top: -1.8em;
    left: 0.1em;
  }
`;

const Wrapper = Flex.extend`
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Circle = styled(({ score, targetScore, loading, ...otherProps }) => {
  let color;

  if (score < 33) {
    color = theme.colors.red;
  } else if (score < 66) {
    color = theme.colors.blue;
  } else {
    color = theme.colors.green;
  }

  return (
    <Wrapper {...otherProps}>
      <Score color={color}>{score}</Score>
      <svg width="3em" height="3em" viewBox="0 0 42 42">
        <Background />
        <Ring />
        <Bar color={color} strokeDasharray={`${score} 100`} />
      </svg>
    </Wrapper>
  );
})`
  font-size: 2.5em;
`;

export default ({ value, ...otherProps }) => {
  return (
    <CountUp
      value={value}
      render={({ value, targetValue }) => {
        return (
          <Circle score={value} targetScore={targetValue} {...otherProps} />
        );
      }}
    />
  );
};
