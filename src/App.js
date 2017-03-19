import React from 'react';
import styled from 'styled-components';
import { withState, pure, compose } from 'recompose';

import Header from './Header';
import FetchButton from './FetchButton';
import Graph from './Graph';

const withRepositoriesTotal = withState('repositoriesTotal', 'setRepositoriesTotal', 0);

export const AppPure = ({ repositoriesTotal, setRepositoriesTotal }) => (
  <AppWrapper>
    <Header inline />
    <FetchButton setRepositoriesTotal={setRepositoriesTotal} />
    {repositoriesTotal ? <Graph repositoriesTotal={repositoriesTotal} /> : null}
  </AppWrapper>
);

export const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const App = compose(
  withRepositoriesTotal,
  pure
)(AppPure);

export default App;
