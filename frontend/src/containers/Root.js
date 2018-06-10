import React, { Component } from "react";
import App from "./App";
import ThemeWrapper from "../components/ThemeWrapper";
import configureApolloClient from "../configureApolloClient";
import {ApolloProvider} from "react-apollo";

class Root extends Component {
  render() {
    return (
      <ThemeWrapper>
        <ApolloProvider client={configureApolloClient()}>
          <App />
        </ApolloProvider>
      </ThemeWrapper>
    );
  }
}

export default Root;
