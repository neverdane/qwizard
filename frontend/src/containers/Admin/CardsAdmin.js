import React from "react";
import Card from "../Card/Card";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import uuid from "uuid-v4";
import {animated, Transition} from "react-spring";

const CardWrapper = styled(animated.div)`
  &:not(:last-of-type) {
    margin-bottom: 1em;
  }
`;

const queryCardsAndLabels = gql`
  {
    cards {
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

const ADD_CARD = gql`
  mutation createCard(
    $sentence: String!
    $answer: String!
    $clientMutationId: String!
  ) {
    createCard(
      input: {
        sentence: $sentence
        answer: $answer
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

export default class extends React.Component {
  state = {
    creationKey: uuid()
  };

  render() {
    return (
      <Query query={queryCardsAndLabels}>
        {({ data: { cards: cardsNodes, labels }, loading }) => {
          if (loading || !cardsNodes) return "loading";

          const selectableLabels = labels.edges.map(({ node: label }) => label);

          const cards = cardsNodes.edges.map(
            ({ node: { id, sentence, answer, labels } }) => ({
              id,
              question: sentence,
              response: answer,
              labels: labels.edges
                ? labels.edges.map(({ node: label }) => label)
                : []
            })
          ).reverse();

          return (
            <React.Fragment>
              <CardWrapper key={this.state.creationKey}>
                <Mutation
                  mutation={ADD_CARD}
                  update={(cache, { data: { createCard } }) => {
                    this.setState({
                      creationKey: uuid()
                    });

                    createCard.labels.edges = createCard.labels.edges || [];
                    createCard.__typename = "Card";

                    const { cards, labels } = cache.readQuery({
                      query: queryCardsAndLabels
                    });

                    cache.writeQuery({
                      query: queryCardsAndLabels,
                      data: {
                        cards: {
                          ...cards,
                          edges: [
                            ...cards.edges,
                            {
                              node: createCard,
                              __typename: "CardEdge"
                            }
                          ]
                        },
                        labels
                      }
                    });
                  }}
                >
                  {createCard => (
                    <Card
                      initialMode="creation"
                      handleSubmit={values => {
                        createCard({
                          variables: {
                            sentence: values.question,
                            answer: values.response,
                            clientMutationId: "mutationId"
                          }
                        });
                      }}
                      selectableLabels={selectableLabels}
                    />
                  )}
                </Mutation>
              </CardWrapper>
                <Transition
                  native
                  config={{ tension: 120, friction: 30 }}
                  keys={cards.map(({ id }) => `card-${id}`)}
                  from={{ opacity: 0, transform: 'scale(0)' }}
                  enter={{ opacity: 1, transform: 'scale(1)' }}
                  leave={{ opacity: 0, pointerEvents: 'none' }}>
                {cards
                  .map(({ id, question, response }) => styles => {
                    return (
                      <CardWrapper
                        key={`card-${id}`}
                        style={styles}
                      >
                        <Card
                          initialMode="summary"
                          key={id}
                          question={question}
                          response={response}
                          labels={[{ name: "histoire" }]}
                          selectableLabels={selectableLabels}
                        />
                      </CardWrapper>
                    );
                  })}
                </Transition>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
