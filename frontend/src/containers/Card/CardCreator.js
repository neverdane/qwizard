import React from "react";
import CardEditor from "./CardEditor";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import uuid from "uuid-v4";
import { animated, Transition } from "react-spring";
import CardSummary from "../../components/Card/CardSummary";

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
      <Query query={QUERY_LABELS}>
        {({ data: { labels }, client, loadingLabels }) => {
          if (loadingLabels || !labels) return "loading";

          const selectableLabels = labels.edges.map(({ node: label }) => label);

          return (
            <React.Fragment>
              <Mutation
                mutation={ADD_CARD}
                update={async (cache, { data: { createCard } }) => {
                  const {
                    data: { card: createdCard }
                  } = await client.query({
                    query: QUERY_CARD,
                    variables: { id: createCard.id }
                  });

                  this.setState({
                    creationKey: uuid()
                  });

                  createCard.labels = createdCard.labels;
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
                      <CardEditor
                        key={this.state.creationKey}
                        initialMode="creation"
                        handleSubmit={values => {
                          createCard({
                            variables: {
                              sentence: values.question,
                              answer: values.response,
                              labels: values.labels.map(label => label.id),
                              clientMutationId: "mutationId"
                            }
                          });
                        }}
                        handleLabelCreate={name =>
                          createLabel({
                            variables: {
                              name: name,
                              clientMutationId: "mutationId"
                            }
                          })
                        }
                        menuPortal={this.menuPortal}
                        selectableLabels={selectableLabels}
                      />
                    )}
                  </Mutation>
                )}
              </Mutation>
              <div ref={this.setMenuPortal} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
