import React from "react";
import {
  Sentence,
  SentenceInput,
  SentencePart
} from "../../components/Quiz/QuizCreator";
import { Flex } from "grid-styled";
import Button from "../../components/Button/Button";
import theme from "../../theme";
import { withFormik } from "formik";
import { generateQuiz } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Container = Flex.extend``;

export default withRouter(
  connect(null, {
    generateQuiz
  })(
    withFormik({
      mapPropsToValues: () => ({
        questionsCount: 20,
        filter: "anything",
        strategy: "smartly"
      }),
      handleSubmit: (values, { props }) => {
        props
          .generateQuiz({
            questionsCount: values.questionsCount,
            filter: values.filter,
            strategy: values.strategy
          })
          .then(quizId => {
            props.history.push(`quiz/${quizId}`);
          });
      }
    })(({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Container>
          <Sentence flex={1}>
            <SentenceInput>20</SentenceInput>
            <SentencePart>questions about</SentencePart>
            <SentenceInput>anything</SentenceInput>
            <SentencePart>picked</SentencePart>
            <SentenceInput>smartly</SentenceInput>
          </Sentence>
          <Button
            type="submit"
            color={theme.colors.white}
            invertedColor={theme.colors.secondary}
          >
            Start Quiz
          </Button>
        </Container>
      </form>
    ))
  )
);
