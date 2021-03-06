import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import { Meteor } from 'meteor/meteor';
import '/imports/lib/styles';
import App from '/imports/App';

// Init the network interface to send operations to the GitHub GraphQL API
const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
});

// Authentication middleware, needed to access the GitHub GraphQL API
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['authorization'] = `Bearer ${Meteor.settings.public.GITHUB_TOKEN}`;
      next();
    },
  },
]);

// Configure the client
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: result => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root')
);
