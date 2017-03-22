import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { branch, renderComponent, pure, compose } from 'recompose';
import { BugIcon } from 'react-octicons-svg';

import { GITHUB_ORG_REPOS_DATA } from './lib/queries';
import formatRepositoriesData from './lib/visualization';

import Card, { CardTitle } from './lib/Card';
import FlexWrapper from './lib/FlexWrapper';
import Graph from './Graph';
import GlobalOverview from './GlobalOverview';

const GraphContainer = ({ totalRepositories, loading, repositories, selectRepository }) => (
  <FlexWrapper>
    <Graph loading={loading} repositories={repositories} selectRepository={selectRepository} />
    {!loading &&
      <GlobalOverview
        displayedRepositories={repositories.length}
        totalRepositories={totalRepositories}
      />}
  </FlexWrapper>
);

GraphContainer.propTypes = {
  totalRepositories: PropTypes.number,
  loading: PropTypes.bool,
  repositories: PropTypes.array,
  selectRepository: PropTypes.func,
};

const withData = graphql(GITHUB_ORG_REPOS_DATA, {
  options: ({ totalRepositories }) => ({ variables: { totalRepositories } }),
  props: (
    {
      data: { loading, organization, error },
      ownProps: { totalRepositories, selectRepository },
    }
  ) => ({
    loading,
    error,
    // format repositories directly, so "the props are ready-to-use"
    repositories: organization &&
      organization.repositories &&
      formatRepositoriesData(organization.repositories.nodes),
    totalRepositories,
    selectRepository,
  }),
});

const withError = branch(
  props => props.error,
  renderComponent(props => (
    <Card>
      <CardTitle>Something went bad <BugIcon />...</CardTitle>
      {props.error.message}
    </Card>
  ))
);

export default compose(withData, withError, pure)(GraphContainer);
