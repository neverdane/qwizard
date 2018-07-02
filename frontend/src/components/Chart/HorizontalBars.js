import React from "react";
import { Flex } from "grid-styled";
import styled from "styled-components";
import CountUp from "../utils/CountUp";

const Bar = Flex.extend`
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  width: ${props => props.percentage}%;
`;

const BarContainer = Flex.extend`
  height: 0.5em;
  position: relative;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Wrapper = Flex.extend`
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`;

const Stat = Flex.extend`
  width: 100%;
  flex-direction: column;
  margin-bottom: 0.6em;
`;

const LegendContainer = Flex.extend`
  justify-content: space-between;
  font-size: 0.65em;
  margin-bottom: 0.3em;
`;

const Title = styled.span`
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const Value = styled.span`
  color: ${props => props.theme.colors.primary};
`;

export default ({ data, total }) => {
  return (
    <Wrapper>
      {data.map(item => (
        <CountUp
          value={item.count}
          render={({ value }) => {
            const percentage = value / total * 100;

            return (
              <Stat>
                <LegendContainer>
                  <Title>{item.name}</Title>
                  <Value>{value}</Value>
                </LegendContainer>
                <BarContainer>
                  <Bar percentage={percentage} />
                </BarContainer>
              </Stat>
            );
          }}
        />
      ))}
    </Wrapper>
  );
};
