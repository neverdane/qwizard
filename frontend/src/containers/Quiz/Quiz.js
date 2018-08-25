import React from "react";
import { connect } from "react-redux";
import { getCurrentQuizIri } from "../../reducers";
import { withRouter } from "react-router-dom";
import QuizQuestionsQuery from "../Apollo/QuizQuestionsQuery";
import Question from "../../components/Question/Question";

export default withRouter(
  connect((state, props) => ({ quizIri: getCurrentQuizIri(props) }))(props => (
    <QuizQuestionsQuery {...props} quiz={props.quizIri}>
      {({ data: { questions }, loadingQuestions }) => {
        if (loadingQuestions || !questions) return "loading";

        return questions.edges.map(
          (
            {
              node: {
                card: { sentence }
              }
            },
            index
          ) => {
            return <Question number={index + 1} question={sentence} />;
          }
        );
      }}
    </QuizQuestionsQuery>
  ))
);
