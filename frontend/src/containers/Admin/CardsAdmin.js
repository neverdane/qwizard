import React from "react";
import Card from "../Card/Card";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import uuid from "uuid-v4";
import { animated, Transition } from "react-spring";

const CardWrapper = styled(animated.div)`
  &:not(:last-of-type) {
    margin-bottom: 1em;
  }
`;

const QUERY_CARDS = gql`
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
        {({ data: { cards: cardsNodes }, loadingCards }) => (
          <Query query={QUERY_LABELS}>
            {({ data: { labels }, loadingLabels }) => {
              if (loadingCards || loadingLabels || !cardsNodes)
                return "loading";

              const selectableLabels = labels.edges.map(
                ({ node: label }) => label
              );

              const cards = cardsNodes.edges
                .map(({ node: { id, sentence, answer, labels } }) => ({
                  id,
                  question: sentence,
                  response: answer,
                  labels: labels.edges
                    ? labels.edges.map(({ node: label }) => label)
                    : []
                }))
                .reverse();

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

                        const { cards } = cache.readQuery({
                          query: QUERY_CARDS
                        });

                        cache.writeQuery({
                          query: QUERY_CARDS,
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
                            }
                          }
                        });
                      }}
                    >
                      {createCard => (
                        <Mutation
                          mutation={ADD_LABEL}
                          update={(cache, { data: { createLabel } }) => {
                            createLabel.__typename = "Label";

                            const { labels } = cache.readQuery({
                              query: QUERY_LABELS
                            });

                            cache.writeQuery({
                              query: QUERY_LABELS,
                              data: {
                                labels: {
                                  ...labels,
                                  edges: [
                                    ...labels.edges,
                                    {
                                      node: createLabel,
                                      __typename: "LabelEdge"
                                    }
                                  ]
                                }
                              }
                            });
                          }}
                        >
                          {createLabel => (
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
                              handleLabelCreate={name => {
                                createLabel({
                                  variables: {
                                    name: name,
                                    clientMutationId: "mutationId"
                                  }
                                });
                              }}
                              menuPortal={this.menuPortal}
                              selectableLabels={selectableLabels}
                            />
                          )}
                        </Mutation>
                      )}
                    </Mutation>
                  </CardWrapper>
                  <Transition
                    native
                    config={{ tension: 120, friction: 30 }}
                    keys={cards.map(({ id }) => `card-${id}`)}
                    from={{ opacity: 0, transform: "scale(0)" }}
                    enter={{ opacity: 1, transform: "scale(1)" }}
                    leave={{ opacity: 0, pointerEvents: "none" }}
                  >
                    {cards.map(({ id, question, response }) => styles => {
                      return (
                        <CardWrapper key={`card-${id}`} style={styles}>
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

                  <div ref={this.setMenuPortal} />
                </React.Fragment>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}
