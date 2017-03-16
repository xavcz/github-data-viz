import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { MarkGithubIcon, HubotIcon, RepoPullIcon, RepoCloneIcon, BugIcon } from 'react-octicons-svg';
import { withApollo } from 'react-apollo';
import { /*withProps, branch, renderComponent,*/ withState, pure, compose } from 'recompose';

import { colors, spacing, fonts, cubic } from './lib/styles';
import { GITHUB_ORG_TOTAL_REPOS } from './lib/queries';

// some constants defining the different button states
export const statusList = [
  { id: 'init', icon: MarkGithubIcon, caption: 'Fetch organization repositories' },
  { id: 'loading', icon: HubotIcon, caption: 'Loading...', disabled: true },
  { id: 'populating', icon: RepoPullIcon, caption: 'Populating graph...', disabled: true },
  { id: 'refetch', icon: RepoCloneIcon, caption: 'Refetch data!' },
  { id: 'error', icon: BugIcon, caption: 'Something bad happened...', disabled: true },
];

// control the button status thanks to a setStatus event handler
const withStatusControl = withState('statusId', 'setStatus', 'init');

export const FetchButtonPure = ({ client, statusId, setStatus }) => {
  const { icon: IconComponent, caption, disabled } = statusList.find(
    status => status.id === statusId
  );

  const loadRepositories = event => {
    event.preventDefault();
    
    setStatus('loading');
    
    return client.query({query: GITHUB_ORG_TOTAL_REPOS})
          .then(result => {
            setStatus('populating')
            console.log('🚀', result);
          })
          .catch(error => {
            setStatus('error');
            console.error('Something bad happened... Is the query correct or the GitHub GraphQL API down? :(\nHere is the error', error);
          });
  };

  return (
    <Button disabled={disabled} onClick={loadRepositories}>
      <IconComponent />{caption}
    </Button>
  );
};

FetchButtonPure.propTypes = {
  client: PropTypes.any,
  statusId: PropTypes.oneOf(statusList.map(status => status.id)),
};

const Button = styled.button`
  svg {
    height: ${spacing.single};
    width: auto;
    fill: ${colors.gradientTop};
    margin-right: ${spacing.quarter};
  }
  
  display: flex;
  align-items: center;
  margin: ${spacing.half};
  
  border: 0;
  padding: ${spacing.quarter} ${spacing.half};
  border-radius: 99px;
  font-size: ${fonts.large};
  color: ${colors.gradientBottom};
  background-color: ${props => props.disabled ? colors.grey : colors.white};
  outline: none;
  cursor: pointer;
  
  box-shadow: 0 6px 15px ${colors.transparentGrey(0.08)};
  transition: box-shadow .5s ${cubic.easeIn}, background-color .5s ${cubic.easeIn};
  
  &:hover {
    box-shadow: 5px ${spacing.quarter} ${spacing.half} ${colors.transparentGrey()};
    background-color: ${colors.grey};
  }
`;

const FetchButton = compose(
  withStatusControl,
  withApollo,
  pure,
)(FetchButtonPure);

export default FetchButton;
