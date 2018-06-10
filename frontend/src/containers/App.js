import React, { Component } from "react";
import Card from "./Card/Card";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Layout from "../components/Layout/Layout";
import styled from 'styled-components'

const CardWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1em;
  }
`

class App extends Component {
  render() {
    const { data, loading } = this.props;

    if (loading || !data.cards) {
      return "loading";
    }

    const selectableLabelsOptions = data.labels.edges.map(({ node }) => ({
      id: node.id,
      label: node.name,
      value: node.name
    }));

    return (
      <Layout>
        <CardWrapper>
        <Card
          initialMode="creation"
          selectableLabelsOptions={selectableLabelsOptions}
        />
        </CardWrapper>

        {data.cards.edges.map(({ node }) => (
          <CardWrapper>
          <Card
            initialMode="summary"
            key={node.id}
            question={node.sentence}
            response={node.answer}
            labels={[{ name: "histoire" }]}
            selectableLabelsOptions={selectableLabelsOptions}
          />
          </CardWrapper>
        ))}
      </Layout>
    );
  }
}

export default graphql(gql`
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
`)(App);
