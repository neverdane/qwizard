import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const QUERY_QUIZ_QUESTIONS = gql`
  query queryQuizQuestions($quiz: String!) {
    questions(quiz: $quiz) {
      edges {
        node {
          id
          card {
            id
            sentence
          }
        }
      }
    }
  }
`;

export default ({ quiz, ...props }) => (
  <Query query={QUERY_QUIZ_QUESTIONS} variables={{ quiz }} {...props} />
);
