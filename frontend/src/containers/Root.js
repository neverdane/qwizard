import React, { Component } from "react";
import App from "./App";
import ThemeWrapper from "../components/ThemeWrapper";
import configureApolloClient from "../configureApolloClient";
import { ApolloProvider } from "react-apollo";
import configureStore from "../configureStore";
import reducers from "../reducers";
import { Provider as ReduxProvider } from "react-redux";

class Root extends Component {
  render() {
    return (
      <ThemeWrapper>
        <ReduxProvider store={configureStore(reducers)}>
          <ApolloProvider client={configureApolloClient()}>
            <App />
          </ApolloProvider>
        </ReduxProvider>
      </ThemeWrapper>
    );
  }
}

export default Root;
