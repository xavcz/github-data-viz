import React from 'react';
import styled from 'styled-components';
import { withState, pure, compose } from 'recompose';

import Header from './Header';
import FetchButton from './FetchButton';
import Graph from './Graph';

const withtotalRepositories = withState('totalRepositories', 'setTotalRepositories', 0);

export const AppPure = ({ totalRepositories, setTotalRepositories }) => (
  <AppWrapper>
    <Header inline />
    <FetchButton setTotalRepositories={setTotalRepositories} />
    {totalRepositories ? <Graph totalRepositories={totalRepositories} /> : null}
  </AppWrapper>
);

export const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const App = compose(
  withtotalRepositories,
  pure
)(AppPure);

export default App;
