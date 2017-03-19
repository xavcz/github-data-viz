import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { colors } from './lib/styles';

import Card from './lib/Card';

// component to display number of issueish with the right color & label
const DataInfo = ({color, dataName, value}) => {
  // "readable" label from the data name
  const humanLabel = dataName === 'pullRequests' ? 'pull requests' : dataName;
  
  // remove the 's' if necessary
  const labelAgreedWithValue = value > 1 ? humanLabel : humanLabel.slice(0, -1);
  
  return <CardLegend color={color}>{value} {labelAgreedWithValue}</CardLegend>;
};

// component displayed when overing a stacked bar in the graph
const RepositoryOverview = ({ repository: { id, name, ...data } }) => (
  <Card>
    <RepositoryTitle>{name}</RepositoryTitle>
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

RepositoryOverview.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    issues: PropTypes.number,
    pullRequests: PropTypes.number,
  }),
};

const RepositoryTitle = styled.h3`
  margin-top: 0;
  color: ${colors.gradientTop};
`;

const CardLegend = styled.div`
  color: ${props => props.color};
`;

export default RepositoryOverview;
