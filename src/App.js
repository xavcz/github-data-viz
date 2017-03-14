import React from 'react';
import { graphql, gql } from 'react-apollo';

import Header from './Header';

export const App = props => <Header inline />;

// Test query to GitHub GraphQL API, used to debug in the devtools at the moment
const GITHUB_QUERY = gql`
query getOrganizationData {
  organization(login: "apollographql") {
    id
    repositories(last: 5, orderBy: {field: UPDATED_AT, direction: ASC}) {
      edges {
        repo: node {
          id
          name
          updatedAt
          pullRequests(last: 5, states: OPEN) {
            edges {
              pr: node {
                id
                title
                url
                updatedAt
              }
            }
          }
          issues(last: 5, states: OPEN) {
            edges {
              issue: node {
                id
                title
                url
                updatedAt
              }
            }
          }
        }
      }
    }
  }
}
`;

export default graphql(GITHUB_QUERY)(App);
