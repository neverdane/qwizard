import React from "react";
import { connect } from "react-redux";
import {
  getCurrentQuizIri,
  getCurrentQuizQuestionIndex,
  getCurrentQuizQuestions
} from "../../reducers";
import { withRouter } from "react-router-dom";
import QuizQuestionsQuery from "../Apollo/QuizQuestionsQuery";
import Question from "../../containers/Question/Question";
import {
  CONDITION_BEHIND,
  CONDITION_STAGE,
  STATUS_ANSWERING,
  STATUS_RIGHT_ANSWER,
  STATUS_WRONG_ANSWER
} from "../../components/Question/Question";
import QuestionsWaitingLine, {
  WAITING_LINE_LENGTH
} from "../../components/Question/WaitingLine";

export default withRouter(
  connect((state, props) => ({
    quizIri: getCurrentQuizIri(props),
    questionsStatuses: getCurrentQuizQuestions(state),
    currentQuestionIndex: getCurrentQuizQuestionIndex(state)
  }))(props => (
    <QuizQuestionsQuery {...props} quiz={props.quizIri}>
      {({ data: { questions }, loadingQuestions }) => {
        if (loadingQuestions || !questions) return "loading";

        const { questionsStatuses, currentQuestionIndex } = props;

        return (
          <QuestionsWaitingLine>
            {questions.edges
              .map(({ node: { id, card: { sentence } } }, index) => {
                if (
                  index >= currentQuestionIndex &&
                  index < WAITING_LINE_LENGTH + currentQuestionIndex
                ) {
                  let status = STATUS_ANSWERING;
                  let answer = null;
                  if (questionsStatuses[index]) {
                    status = questionsStatuses[index].isAnswerRight
                      ? STATUS_RIGHT_ANSWER
                      : STATUS_WRONG_ANSWER;
                    answer = questionsStatuses[index].answer;
                  }

                  return (
                    <Question
                      key={id}
                      iri={id}
                      number={index + 1}
                      question={sentence}
                      condition={
                        index === currentQuestionIndex ? CONDITION_STAGE : CONDITION_BEHIND
                      }
                      status={status}
                      answer={answer}
                    />
                  );
                }
              })}
          </QuestionsWaitingLine>
        );
      }}
    </QuizQuestionsQuery>
  ))
);
