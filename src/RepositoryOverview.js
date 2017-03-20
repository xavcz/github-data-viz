import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { branch, renderComponent, pure, compose } from 'recompose';
import { RepoCloneIcon, RepoIcon, PulseIcon, BroadcastIcon } from 'react-octicons-svg';

import { colors } from './lib/styles';
import Card, { CardTitle, CardItem } from './lib/Card';

// component to display number of issueish with the right color & label
const DataInfo = ({color, dataName, value}) => {
  // "readable" label from the data name
  const humanLabel = dataName === 'pullRequests' ? 'pull requests' : dataName;
  
  // remove the 's' if necessary
  const labelAgreedWithValue = value > 1 ? humanLabel : humanLabel.slice(0, -1);
  
  return (
    <RepositoryLegend color={color}>
      {value} {labelAgreedWithValue}
    </RepositoryLegend>
  );
};

const RepositoryLegend = styled.div`
  color: ${props => props.color};
`;

// component displayed when overing a stacked bar in the graph
const RepositoryOverview = ({ repository: { id, name, ...data } }) => (
  <Card>
    <CardTitle>{name} <RepoIcon /></CardTitle>
    {
      // from { issues: xxx, pullRequests: yyy }, map over ['issues', 'pullRequests']
      Object.keys(data).map(dataName => (
        <DataInfo
          key={`${dataName}-${id}`}
          color={colors[dataName]} 
          dataName={dataName}
          value={data[dataName]}
        />
      ))
    }
  </Card>
);

const RepositoryOverviewLoading = ({ totalRepositories }) => (
  <Card>
    <CardTitle>Operating on repositories...</CardTitle>
    <CardItem>Treating {totalRepositories} <RepoCloneIcon />...</CardItem>
    <CardItem>Incoming transmission from GitHub!</CardItem>
  </Card>
);

const RepositoryOverviewOnboarding = () => (
  <Card>
    <CardTitle>Bars are <RepoIcon />'s issueish information!</CardTitle>
    <CardItem>Organization data received! <PulseIcon /></CardItem>
    <CardItem>Mouse over a bar to get repository data displayed here.</CardItem>
  </Card>
);

const withLoadingState = branch(
  props => props.currentStatus === 'populating',
  renderComponent(RepositoryOverviewLoading)
);

const withOnboardingState = branch(
  props => props.currentStatus === 'populated' && !props.repository,
  renderComponent(RepositoryOverviewOnboarding)
);

RepositoryOverview.propTypes = {
  repository: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    issues: PropTypes.number,
    pullRequests: PropTypes.number,
  }),
};

export default compose(
  withLoadingState,
  withOnboardingState,
  pure,
)(RepositoryOverview);
