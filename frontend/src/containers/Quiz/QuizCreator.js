import React from "react";
import {
  Sentence,
  SentenceInput,
  SentencePart
} from "../../components/Quiz/QuizCreator";
import { Flex } from "grid-styled";
import Button from "../../components/Button/Button";
import theme from "../../theme";

const Container = Flex.extend``;

export default props => (
  <Container>
    <Sentence flex={1}>
      <SentenceInput>20</SentenceInput>
      <SentencePart>questions about</SentencePart>
      <SentenceInput>anything</SentenceInput>
      <SentencePart>picked</SentencePart>
      <SentenceInput>smartly</SentenceInput>
    </Sentence>
    <Button color={theme.colors.white} invertedColor={theme.colors.secondary}>Start Quiz</Button>
  </Container>
);
