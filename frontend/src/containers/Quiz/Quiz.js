import React from "react";
import {connect} from "react-redux";
import {
  getCurrentQuizIri,
  getCurrentQuizQuestionIndex,
  getCurrentQuizQuestions
} from "../../reducers";
import {withRouter} from "react-router-dom";
import QuizQuestionsQuery from "../Apollo/QuizQuestionsQuery";
import Question from "../../containers/Question/Question";
import {
  STATUS_ANSWERING,
  STATUS_RIGHT_ANSWER,
  STATUS_WRONG_ANSWER
} from "../../components/Question/Question";
import QuestionsWaitingLine, {
  WAITING_LINE_LENGTH
} from "../../components/Question/WaitingLine";
import QuestionApparition from "../../components/Question/Apparition";

export default withRouter(
  connect((state, props) => ({
    quizIri: getCurrentQuizIri(props),
    questionsStatuses: getCurrentQuizQuestions(state),
    currentQuestionIndex: getCurrentQuizQuestionIndex(state)
  }))(props => (
    <QuizQuestionsQuery {...props} quiz={props.quizIri}>
      {({data: {questions}, loadingQuestions}) => {
        if (loadingQuestions || !questions) return "loading";

        const {questionsStatuses, currentQuestionIndex} = props;

        return (
          <QuestionsWaitingLine>
            {questions.edges
              .map(({node: {id, card: {sentence}}}, index) => {

                let status = STATUS_ANSWERING;
                let answer = null;
                if (questionsStatuses[index]) {
                  status = questionsStatuses[index].isAnswerRight
                    ? STATUS_RIGHT_ANSWER
                    : STATUS_WRONG_ANSWER;
                  answer = questionsStatuses[index].answer;
                }

                const stagePosition = index - currentQuestionIndex;

                return (
                  <QuestionApparition
                    key={id} keys={(
                    index >= currentQuestionIndex &&
                    index < WAITING_LINE_LENGTH + currentQuestionIndex
                  ) ? ['default'] : []} delay={stagePosition * 200}
                    stagePosition={stagePosition}>
                    {style => (
                      <Question
                        iri={id}
                        style={style}
                        number={index + 1}
                        question={sentence}
                        stagePosition={stagePosition}
                        status={status}
                        answer={answer}
                      />
                    )}
                  </QuestionApparition>
                );
              })}
          </QuestionsWaitingLine>
        );
      }}
    </QuizQuestionsQuery>
  ))
);
