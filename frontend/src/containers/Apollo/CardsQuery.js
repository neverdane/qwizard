import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Transition } from "react-spring";

export const QUERY_CARDS = gql`
  {
    cards(first: 5, order: { createdAt: "DESC" }) {
      edges {
        node {
          id
          sentence
          answer
          labels {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default props => <Query query={QUERY_CARDS} {...props} />;
