import { combineReducers } from "redux";

const lastQuizId = (state = null, action) => {
  switch (action.type) {
    case "GENERATE_QUIZ_SUCCESS":
      return action.quizId;
    default:
      return state;
  }
};

export default combineReducers({
  lastQuizId
});

export const getLastQuizId = state => state.lastQuizId;
export const getCurrentQuizId = props => props.match.params.quizId || null;
export const getCurrentQuizIri = props => {
  const quizId = getCurrentQuizId(props);

  return quizId ? `/quizzes/${quizId}` : null;
};
