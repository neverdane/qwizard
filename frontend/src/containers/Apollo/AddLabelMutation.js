import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Transition } from "react-spring";
import { QUERY_LABELS } from "../Apollo/LabelsQuery";

const ADD_LABEL = gql`
  mutation createLabel($name: String!, $clientMutationId: String!) {
    createLabel(input: { name: $name, clientMutationId: $clientMutationId }) {
      id
      name
    }
  }
`;

export default props => (
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
    {...props}
  />
);
