import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {QUERY_CARDS} from "./CardsQuery";

const ADD_CARD = gql`
  mutation createCard(
    $sentence: String!
    $answer: String!
    $labels: [String]
    $clientMutationId: String!
  ) {
    createCard(
      input: {
        sentence: $sentence
        answer: $answer
        labels: $labels
        clientMutationId: $clientMutationId
      }
    ) {
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
`;

const QUERY_CARD = gql`
  query getCard($id: ID!) {
    card(id: $id) {
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
`;

export default props => (
  <Mutation
    mutation={ADD_CARD}
    update={async (cache, { data: { createCard } }) => {
      const {
        data: { card: createdCard }
      } = await props.client.query({
        query: QUERY_CARD,
        variables: { id: createCard.id }
      });

      createCard.labels = createdCard.labels;
      createCard.__typename = "Card";

      const { cards } = cache.readQuery({
        query: QUERY_CARDS
      });

      if (cards.edges.length >= 5) {
        cards.edges.splice(-1, 1);
      }

      cache.writeQuery({
        query: QUERY_CARDS,
        data: {
          cards: {
            ...cards,
            edges: [
              {
                node: createCard,
                __typename: "CardEdge"
              },
              ...cards.edges
            ]
          }
        }
      });
    }}
    {...props}
  />
);
