import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const QUERY_LABELS = gql`
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

export default props => <Query query={QUERY_LABELS} {...props} />;
