import React from "react";
import styled from "styled-components";
import CountUp from "../utils/CountUp";

const Value = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5em;
  line-height: 1.2em;
`;

export default ({ value }) => {
  return (
    <CountUp
      value={value}
      render={({ value }) => {
        return (
          <Value>{value.toLocaleString()}</Value>
        );
      }}
    />
  );
};
