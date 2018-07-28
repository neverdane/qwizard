import React from "react";
import styled from "styled-components";
import { InversedInput } from "../Form/Input";
import Button from "../Button/Button";
import StreamLines from "../Stream/StreamLines";
import theme from "../../theme";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 70%;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  background: ${props => props.theme.colors.primary};
  padding: 0.5em 7em;
  min-height: 7em;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.dark};
  padding: 2.5em 7em;
  color: ${props => props.theme.colors.white};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.white};
  align-self: flex-end;
  font-size: 1.8em;
`;

const Number = styled.span`
  position: absolute;
  left: 0.5em;
  bottom: -0.5em;
  font-size: 9em;
  color: ${props => props.theme.colors.transparentDark};
`;

const QuestionRow = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
`;

const StatusPlaceholder = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-top: 2.5em;
`;

const Placeholder = styled(StreamLines)`
  height: 100%;
  width: 100%;
  fill: ${props => props.theme.colors.transparentBlack};
`;

export default props => (
  <Container>
    <Header>
      <Number>01</Number>
      <Title>Qui a réalisé Batman The Dark Knight ?</Title>
    </Header>
    <Body>
      <QuestionRow>
        <InversedInput style={{ flexGrow: 1, marginRight: "1em" }} />
        <Button invertedColor={theme.colors.dark}>Answer</Button>
      </QuestionRow>
      <StatusPlaceholder>
        <Placeholder
          viewBox={`0 0 1920 100`}
          lines={[
            {
              paths: [
                { width: 500 },
                { width: 300 },
                { width: 200 },
                { width: 400 },
                { width: 240 }
              ]
            },
            {
              paths: [{ width: 300 }, { width: 100 }, { width: 200 }]
            }
          ]}
        />
      </StatusPlaceholder>
    </Body>
  </Container>
);
