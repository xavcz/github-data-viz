import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { pure, compose } from 'recompose';

import { GITHUB_ORG_REPOS_DATA } from './lib/queries';
import formatRepositoriesData from './lib/visualization';
import hardcodedData from './lib/hardcodedData';

import FlexWrapper from './lib/FlexWrapper';
import Graph from './Graph';
import GlobalOverview from './GlobalOverview';

const GraphContainer = ({ totalRepositories, loading, error, repositories, selectRepository }) => {
  if (error) {
    // eslint-disable-next-line
    console.warn(
      'The graph displays hardcoded data, got from GitHub GraphQL Explorer: the GitHub API has a bug at the moment. See thread: https://platform.github.community/t/something-went-wrong-while-executing-your-query-this-is-most-likely-a-github-bug/1521/5?u=xavcz'
    );
  }

  return (
    <FlexWrapper>
      <Graph loading={loading} repositories={repositories} selectRepository={selectRepository} />
      {!loading &&
        <GlobalOverview
          displayedRepositories={repositories.length}
          totalRepositories={totalRepositories}
        />}
    </FlexWrapper>
  );
};

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
    repositories: error
      ? formatRepositoriesData(hardcodedData)
      : organization &&
          organization.repositories &&
          organization.repositories.edges &&
          formatRepositoriesData(organization.repositories.edges.nodes),
    totalRepositories,
    selectRepository,
  }),
});

export default compose(withData, pure)(GraphContainer);
