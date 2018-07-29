import React from "react";
import styled from "styled-components";
import { InversedInput } from "../Form/Input";
import Button from "../Button/Button";
import StreamLines from "../Stream/StreamLines";
import theme from "../../theme";

export const STATUS_ANSWERING = "answering";
export const STATUS_WRONG_ANSWER = "wrong-answer";
export const STATUS_RIGHT_ANSWER = "right-answer";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 70%;
  position: relative;
`;

const getColorFromStatus = ({ status, theme }) => {
  switch (status) {
    default:
    case STATUS_ANSWERING:
      return theme.colors.primary;
    case STATUS_RIGHT_ANSWER:
      return theme.colors.green;
    case STATUS_WRONG_ANSWER:
      return theme.colors.red;
  }
};

const Header = styled.header`
  display: flex;
  background: ${props => getColorFromStatus(props)};
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

const Status = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 2.5em;
  min-height: 3em;
`;

const Placeholder = styled(StreamLines)`
  height: 100%;
  width: 100%;
  fill: ${props => props.theme.colors.transparentBlack};
`;

const RightAnswerStatus = styled.span`
  color: ${props => props.theme.colors.green};
  font-size: 1.8em;
  text-transform: uppercase;
`;

const WrongAnswerStatus = RightAnswerStatus.extend`
  color: ${props => props.theme.colors.red};
  margin-right: 1em;
`;

const RightAnswer = styled.span`
  color: ${props => props.theme.colors.white};
  font-size: 1.3em;
  position: relative;
  top: 0.4em;
`;

export default ({ number, question, status, answer }) => (
  <Container>
    <Header status={status}>
      <Number>{number.toString().padStart(2, "0")}</Number>
      <Title>{question}</Title>
    </Header>
    <Body>
      <QuestionRow>
        <InversedInput
          disabled={[STATUS_WRONG_ANSWER, STATUS_RIGHT_ANSWER].includes(status)}
          style={{ flexGrow: 1, marginRight: "1em" }}
        />
        <Button
          invertedColor={theme.colors.dark}
          disabled={[STATUS_WRONG_ANSWER, STATUS_RIGHT_ANSWER].includes(status)}
        >
          Answer
        </Button>
      </QuestionRow>
      <Status>
        {status === STATUS_RIGHT_ANSWER && (
          <RightAnswerStatus>Correct !</RightAnswerStatus>
        )}
        {status === STATUS_WRONG_ANSWER && (
          <React.Fragment>
            <WrongAnswerStatus>Faux...</WrongAnswerStatus>
            <RightAnswer>La réponse était {answer}.</RightAnswer>
          </React.Fragment>
        )}
        {status === STATUS_ANSWERING && (
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
        )}
      </Status>
    </Body>
  </Container>
);
