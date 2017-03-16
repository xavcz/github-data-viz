import React from 'react';
import styled from 'styled-components';
import { pure, compose } from 'recompose';

import Header from './Header';
import FetchButton from './FetchButton';

export const AppPure = props => (
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

// const displayLoadingState = branch(
//   props => props.loading,
//   renderComponent(withProps(() => ({ statusId: 'loading' }))(component))
// );

const App = compose(
  // withTotalQuery,
  pure
)(AppPure);

export default App;
