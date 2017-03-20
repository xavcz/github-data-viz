import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { withState, pure, compose } from 'recompose';

import { GITHUB_ORG_REPOS_DATA } from './lib/queries';
import formatRepositoriesData from './lib/visualization';

import FlexWrapper from './lib/FlexWrapper';
import RepositoryOverview from './RepositoryOverview';
import Graph from './Graph';
import GlobalOverview from './GlobalOverview';

const GraphContainer = ({ totalRepositories, loading, repositories, repository, selectRepository })  => (
  <FlexWrapper>
    <RepositoryOverview
      loading={loading}
      repository={repository}
    />
    <Graph 
      loading={loading}
      repositories={repositories}
      selectRepository={selectRepository}
    />
    {
      !loading && 
      <GlobalOverview 
        displayedRepositories={repositories.length}
        totalRepositories={totalRepositories}
      />
    }
  </FlexWrapper>
);

GraphContainer.propTypes = {
  totalRepositories: PropTypes.number,
  loading: PropTypes.bool,
  repositories: PropTypes.array,
  repository: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    issues: PropTypes.number,
    pullRequests: PropTypes.number,
  }),
  selectRepository: PropTypes.func,
};

const withData = graphql(GITHUB_ORG_REPOS_DATA, {
  options: ({ reposCount }) => ({variables: { reposCount } }),
  props: ({ data: { loading, organization }, ownProps: { totalRepositories } }) => ({
    loading,
    repositories: organization && organization.repositories && formatRepositoriesData(organization.repositories.nodes), 
    totalRepositories,
  }),
});

const withSelectedBar = withState('repository', 'selectRepository', null);

export default compose(
  withData,
  withSelectedBar,
  pure,
)(GraphContainer);
