import React from "react";
import styled from "styled-components";
import { Row } from "./Card";
import Tag from "./Tag";
import { Flex } from "grid-styled";
import { Trail } from "react-spring";

const Title = styled.h3`
  color: ${props => props.theme.colors.dark};
  font-size: 1.6rem;
`;

export default ({ question, labels = [] }) => {
  const rows = [
    <React.Fragment>
      <Title style={{ flexGrow: 1, marginRight: "1.3rem" }}>{question}</Title>
      <Flex>
        {labels.map(label => <Tag key={label.name}>{label.name}</Tag>)}
      </Flex>
    </React.Fragment>
  ];

  return (
    <Trail
      native
      from={{ opacity: 0, x: 5 }}
      to={{ opacity: 1, x: 0 }}
      keys={rows}
      config={{ tension: 120, friction: 30 }}
    >
      {rows.map((row, index) => ({ x, opacity }) => {
        return (
          <Row
            key={index}
            style={{
              opacity,
              transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
            }}
          >
            {row}
          </Row>
        );
      })}
    </Trail>
  );
};
