import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { AppContextWrapper } from "./appContext";

const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <React.StrictMode>
        <AppContextWrapper>
          <App />
        </AppContextWrapper>
      </React.StrictMode>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
