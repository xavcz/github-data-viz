import React from 'react';
import { graphql } from 'react-apollo';
import { withProps, withState, pure, compose } from 'recompose';

import FlexWrapper from './lib/FlexWrapper';
import Header from './Header';
import StatusButton from './StatusButton';
import GraphContainer from './GraphContainer';
import RepositoryOverview from './RepositoryOverview';

import { GITHUB_ORG_TOTAL_REPOS } from './lib/queries';

export const AppPure = (
  {
    totalRepositories,
    repository,
    selectRepository,
    currentStatus,
  }
) => (
  <FlexWrapper>
    <Header inline />
    <StatusButton currentStatus={currentStatus} repository={repository} />
    {totalRepositories
      ? <div>
          <RepositoryOverview
            currentStatus={currentStatus}
            repository={repository}
            totalRepositories={totalRepositories}
          />
          <GraphContainer
            selectRepository={selectRepository}
            totalRepositories={totalRepositories}
          />
        </div>
      : null}
  </FlexWrapper>
);

// get the total number of repositories of the organization
// note: organization's repositories pagination is broken on the gh graphql api
const withTotalRepositories = graphql(GITHUB_ORG_TOTAL_REPOS, {
  props: ({ data: { loading, error, organization } }) => ({
    loading,
    error,
    totalRepositories: organization &&
      organization.repositories &&
      organization.repositories.totalCount,
  }),
});

// default value: undefined.
// once the graph is populated, we set it to null
// once a repository is selected, it holds the repository's data
const withSelectedRepo = withState('repository', 'selectRepository');

// branching with only one hoc instead of many `branch`
const withAutomaticStatus = withProps(props => {
  // something bad happened
  if (props.error) return { ...props, currentStatus: 'error' };

  // loading the organization total repositories
  if (props.loading) return { ...props, currentStatus: 'loading' };

  // a repository is selected
  if (props.repository) return { ...props, currentStatus: 'check-repo' };

  // total repositories data have been loaded
  if (props.totalRepositories) {
    // when the graph is populated, we manually set to `null` the selected repository
    // note: it could be also be done with a specific method like `graphPopulated`
    const currentStatus = props.repository === null ? 'populated' : 'populating';
    return { ...props, currentStatus };
  }
});

const App = compose(withTotalRepositories, withSelectedRepo, withAutomaticStatus, pure)(AppPure);

export default App;
