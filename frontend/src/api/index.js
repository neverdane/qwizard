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
