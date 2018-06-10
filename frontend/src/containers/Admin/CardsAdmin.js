import React from "react";
import Card from "../Card/Card";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const CardWrapper = styled.div`
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

export default () => (
  <Query query={queryCardsAndLabels}>
    {({ data: { cards: cardsNodes, labels }, loading }) => {
      if (loading || !cardsNodes) return "loading";

      const selectableLabels = labels.edges.map(({ node: label }) => label);

      const cards = cardsNodes.edges.map(({ node: {id, sentence, answer, labels} }) => ({
        id,
        question: sentence,
        response: answer,
        labels: labels
          ? labels.edges.map(({ node: label }) => label)
          : []
      }));

      return (
        <React.Fragment>
          <CardWrapper>
            <Card initialMode="creation" selectableLabels={selectableLabels} />
          </CardWrapper>

          {cards.map(({ id, question, response }) => (
            <CardWrapper>
              <Card
                initialMode="summary"
                key={id}
                question={question}
                response={response}
                labels={[{ name: "histoire" }]}
                selectableLabels={selectableLabels}
              />
            </CardWrapper>
          ))}
        </React.Fragment>
      );
    }}
  </Query>
);
