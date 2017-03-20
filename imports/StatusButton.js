import React, { PropTypes } from 'react';
import { HubotIcon, RepoPullIcon, GraphIcon, GitCompareIcon, BugIcon } from 'react-octicons-svg';
import { pure, compose } from 'recompose';

import Button from './lib/Button';

// some constants defining the different button states
export const statusList = [
  { id: 'loading', icon: HubotIcon, caption: 'Loading...', disabled: true },
  { id: 'populating', icon: GitCompareIcon, caption: 'Populating graph...', disabled: true },
  { id: 'populated', icon: GraphIcon, caption: 'Look at the graph!' },
  { id: 'check-repo', icon: RepoPullIcon, caption: 'Go to repository!' },
  { id: 'error', icon: BugIcon, caption: 'Something bad happened...', disabled: true },
];

export const StatusButtonPure = ({ currentStatus = 'loading', repository }) => {
  const { icon: IconComponent, caption, disabled } = statusList.find(
    status => status.id === currentStatus
  );

  const handleClick = currentStatus === 'check-repo'
    ? () => window.location = `https://github.com/apollographql/${repository.name}`
    : () => console.info('Look at the graph! \\o/'); // eslint-disable-line no-console

  return (
    <Button disabled={disabled} onClick={handleClick} big>
      <IconComponent />{caption}
    </Button>
  );
};

StatusButtonPure.propTypes = {
  currentStatus: PropTypes.oneOf(statusList.map(status => status.id)),
  repository: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    issues: PropTypes.number,
    pullRequests: PropTypes.number,
  }),
};

const StatusButton = compose(pure)(StatusButtonPure);

export default StatusButton;
