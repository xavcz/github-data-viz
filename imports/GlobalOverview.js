import React, { PropTypes } from 'react';
import styled from 'styled-components';
import {
  RepoIcon,
  RepoCloneIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  GraphIcon,
  PulseIcon,
} from 'react-octicons-svg';

import Card, { CardItem } from './lib/Card';
import { colors, spacing } from './lib/styles';

const GlobalOverview = ({ displayedRepositories, totalRepositories }) => (
  <Card>
    <CardItem>The <GraphIcon /> displays {displayedRepositories} <RepoCloneIcon />.</CardItem>
    <CardItem>
      {totalRepositories - displayedRepositories}
      {' '}
      <RepoCloneIcon />
      {' '}are hidden as they don't have issueish data{' '}
      <PulseIcon />
      .
    </CardItem>
    <CardItem>
      The{' '}
      <IssueOpenedIcon />
      {' '}for each{' '}
      <RepoIcon />
      {' '}are displayed in{' '}
      <ColorBlock color={colors.issues} />
      {' '}on the{' '}
      <GraphIcon />
      .
    </CardItem>
    <CardItem>
      The{' '}
      <GitPullRequestIcon />
      {' '}for each{' '}
      <RepoIcon />
      {' '}are displayed in{' '}
      <ColorBlock color={colors.pullRequests} />
      {' '}on the{' '}
      <GraphIcon />
      .
    </CardItem>
  </Card>
);

const ColorBlock = styled.span`
  display: inline-block;
  background: ${props => props.color};
  width: 16px;
  height: 16px;
  margin: 0 ${spacing.quarter};
`;

GlobalOverview.propTypes = {
  displayedRepositories: PropTypes.number,
  totalRepositories: PropTypes.number,
};

export default GlobalOverview;
