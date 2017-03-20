import React from 'react';
import { withState, pure, compose } from 'recompose';

import FlexWrapper from './lib/FlexWrapper';
import Header from './Header';
import FetchButton from './FetchButton';
import GraphContainer from './GraphContainer';

const withtotalRepositories = withState('totalRepositories', 'setTotalRepositories', null);

export const AppPure = ({ totalRepositories, setTotalRepositories }) => (
  <FlexWrapper>
    <Header inline />
    <FetchButton setTotalRepositories={setTotalRepositories} />
    {totalRepositories && <GraphContainer totalRepositories={totalRepositories} />}
  </FlexWrapper>
);

const App = compose(
  withtotalRepositories,
  pure
)(AppPure);

export default App;
