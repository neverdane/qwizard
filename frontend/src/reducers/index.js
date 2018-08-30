import { combineReducers } from "redux";

const currentQuizQuestions = (state = [], action) => {
  switch (action.type) {
    case "ANSWER_QUESTION_SUCCESS":
      return [
        ...state.slice(0, action.questionIndex),
        { isAnswerRight: action.isAnswerRight, answer: action.answer },
        ...state.slice(action.questionIndex + 1)
      ];
    default:
      return state;
  }
};

const currentQuestionIndex = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const currentQuiz = combineReducers({
  currentQuestionIndex,
  questions: currentQuizQuestions
});

const lastQuizId = (state = null, action) => {
  switch (action.type) {
    case "GENERATE_QUIZ_SUCCESS":
      return action.quizId;
    default:
      return state;
  }
};

export default combineReducers({
  lastQuizId,
  currentQuiz
});

export const getLastQuizId = state => state.lastQuizId;
export const getCurrentQuizId = props => props.match.params.quizId || null;
export const getCurrentQuizIri = props => {
  const quizId = getCurrentQuizId(props);

  return quizId ? `/quizzes/${quizId}` : null;
};

export const getCurrentQuiz = state => state.currentQuiz;
export const getCurrentQuizQuestions = state => getCurrentQuiz(state).questions;
