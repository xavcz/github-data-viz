import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { MarkGithubIcon, RepoIcon, IssueOpenedIcon, GitPullRequestIcon, GraphIcon, OrganizationIcon, FileCodeIcon, CommentDiscussionIcon, ProjectIcon } from 'react-octicons-svg'

import Card, { CardTitle, CardItem } from './lib/Card';
import { colors, spacing } from './lib/styles';

const GlobalOverview = ({ totalRepositories }) => (
  <Card>
    <CardTitle>Apollo GraphQL <OrganizationIcon /></CardTitle>
    <CardItem>The <GraphIcon /> displays {totalRepositories} <RepoIcon />.</CardItem>
    <CardItem>The <IssueOpenedIcon /> for each <RepoIcon /> are displayed in <ColorBlock color={colors.issues} /> on the <GraphIcon />.</CardItem>
    <CardItem>The <GitPullRequestIcon /> for each <RepoIcon /> are displayed in <ColorBlock color={colors.pullRequests} /> on the <GraphIcon />.</CardItem>
    <CardItem>The <FileCodeIcon /> of this project is available on <MarkGithubIcon />.</CardItem>
    <CardItem>Let's <CommentDiscussionIcon /> about the engineering of this <ProjectIcon />!</CardItem>
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
  totalRepositories: PropTypes.number,
};

export default GlobalOverview;
