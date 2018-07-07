import React from "react";
import CardEditor from "./CardEditor";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import uuid from "uuid-v4";
import { animated, Transition } from "react-spring";
import CardSummary, {List} from "../../components/Card/CardSummary";

const QUERY_CARDS = gql`
  {
    cards(first: 5, order: {createdAt: "DESC"}) {
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

const QUERY_LABELS = gql`
  {
    labels {
      edges {
        node {
          id
          name
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

const ADD_LABEL = gql`
  mutation createLabel($name: String!, $clientMutationId: String!) {
    createLabel(input: { name: $name, clientMutationId: $clientMutationId }) {
      id
      name
    }
  }
`;

export default class extends React.Component {
  state = {
    creationKey: uuid()
  };

  menuPortal = null;

  setMenuPortal = element => {
    this.menuPortal = element;
    this.forceUpdate();
  };

  render() {
    return (
      <Query query={QUERY_CARDS}>
        {({ data: { cards: cardsNodes }, client, loadingCards }) => {

          if (loadingCards || !cardsNodes) return "loading";

          const cards = cardsNodes.edges
            .map(({ node: { id, sentence, answer, labels } }) => ({
              id,
              question: sentence,
              response: answer,
              labels: labels.edges
                ? labels.edges.map(({ node: label }) => label)
                : []
            }));

          return (
            <List>
              <Transition
                native
                config={{ tension: 120, friction: 30 }}
                keys={cards.map(({ id }) => `card-${id}`)}
                from={{ opacity: 0, transform: "scale(0)" }}
                enter={{ opacity: 1, transform: "scale(1)" }}
                leave={{ opacity: 0, pointerEvents: "none" }}
              >
                {cards.map(({ id, question, response, labels }) => styles => {
                  return (
                    <animated.div key={`card-${id}`} style={styles}>
                      <CardSummary
                        key={id}
                        question={question}
                        response={response}
                        labels={labels}
                      />
                    </animated.div>
                  );
                })}
              </Transition>

              <div ref={this.setMenuPortal} />
            </List>
          );
        }}
      </Query>
    );
  }
}
