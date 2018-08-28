import { client } from "./client";

export const generateQuiz = ({
  questionsCount = 10,
  filter = "anything",
  strategy = "smartly"
}) =>
  client.post("http://localhost:8080/quizzes/generation", {
    questionsCount,
    filter,
    strategy
  });

export const submitQuestionResponse = (iri, response) => {
  return client
    .put(`http://localhost:8080${iri}`, { response })
    .then(data => ({
      isAnswerRight: data.answerRight,
      answer: null
    }));
};
