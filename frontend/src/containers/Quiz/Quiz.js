import React from "react";
import { connect } from "react-redux";
import { getCurrentQuizIri } from "../../reducers";
import { withRouter } from "react-router-dom";
import QuizQuestionsQuery from "../Apollo/QuizQuestionsQuery";
import Question from "../../containers/Question/Question";
import {
  CONDITION_BEHIND,
  CONDITION_STAGE
} from "../../components/Question/Question";
import QuestionsWaitingLine, {
  WAITING_LINE_LENGTH
} from "../../components/Question/WaitingLine";

export default withRouter(
  connect((state, props) => ({ quizIri: getCurrentQuizIri(props) }))(props => (
    <QuizQuestionsQuery {...props} quiz={props.quizIri}>
      {({ data: { questions }, loadingQuestions }) => {
        if (loadingQuestions || !questions) return "loading";

        return (
          <QuestionsWaitingLine>
            {questions.edges.map(
              (
                {
                  node: {
                    id,
                    card: { sentence }
                  }
                },
                index
              ) => {
                if (index < WAITING_LINE_LENGTH) {
                  return (
                    <Question
                      key={id}
                      iri={id}
                      number={index + 1}
                      question={sentence}
                      condition={
                        index === 0 ? CONDITION_STAGE : CONDITION_BEHIND
                      }
                    />
                  );
                }
              }
            )}
          </QuestionsWaitingLine>
        );
      }}
    </QuizQuestionsQuery>
  ))
);
