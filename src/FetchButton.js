import React, { PropTypes } from 'react';
import { MarkGithubIcon, HubotIcon, RepoPullIcon, RepoCloneIcon, BugIcon } from 'react-octicons-svg';
import { withApollo } from 'react-apollo';
import { withState, pure, compose } from 'recompose';

import Button from './lib/Button';
import { GITHUB_ORG_TOTAL_REPOS } from './lib/queries';

// some constants defining the different button states
export const statusList = [
  { id: 'init', icon: MarkGithubIcon, caption: 'Fetch repositories' },
  { id: 'loading', icon: HubotIcon, caption: 'Loading...', disabled: true },
  { id: 'populating', icon: RepoPullIcon, caption: 'Populating graph...', disabled: true },
  { id: 'refetch', icon: RepoCloneIcon, caption: 'Refetch data!' },
  { id: 'error', icon: BugIcon, caption: 'Something bad happened...', disabled: true },
];

// control the button status thanks to a setStatus event handler
const withStatusControl = withState('statusId', 'setStatus', 'init');

export const FetchButtonPure = ({ client, statusId, setStatus, setTotalRepositories }) => {
  const { icon: IconComponent, caption, disabled } = statusList.find(
    status => status.id === statusId
  );

  const loadRepositories = event => {
    event.preventDefault();
    
    setStatus('loading');
    
    return client.query({query: GITHUB_ORG_TOTAL_REPOS})
          .then(org => {
            setTotalRepositories(org.data.organization.repositories.totalCount);
            setStatus('populating');
          })
          .catch(error => {
            setStatus('error');
            console.error('Something bad happened... Is the query correct or the GitHub GraphQL API down? :(', error);
          });
  };

  return (
    <Button 
      disabled={disabled}
      onClick={loadRepositories}
      big
    >
      <IconComponent />{caption}
    </Button>
  );
};

FetchButtonPure.propTypes = {
  client: PropTypes.any,
  statusId: PropTypes.oneOf(statusList.map(status => status.id)),
  setStatus: PropTypes.func, 
  setTotalRepositories: PropTypes.func,
};

const FetchButton = compose(
  withStatusControl,
  withApollo,
  pure,
)(FetchButtonPure);

export default FetchButton;
