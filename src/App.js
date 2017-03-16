import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import { GITHUB_ORG_TOTAL_REPOS } from './lib/graphql';

import Header from './Header';
import FetchButton from './FetchButton';

export const App = props => (
  <AppWrapper>
    <Header inline />
    <FetchButton />
  </AppWrapper>
);

export const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export default graphql(GITHUB_ORG_TOTAL_REPOS)(App);
