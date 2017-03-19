import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { colors, cubic } from './lib/styles';

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
    <CardTitle>{name}</CardTitle>
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  background-color: ${colors.white};
  background-image: linear-gradient(to bottom, ${colors.white} 0%, rgba(255,255,255,0) 100%);
  box-shadow: 0 6px 15px ${colors.transparentGrey(0.08)};
  border-radius: 16px;
  overflow: hidden;
  color: #333;
  transition: box-shadow 0.5s ${cubic.easeIn}, background-color 0.5s ${cubic.easeIn};
  
  &:hover {
    box-shadow: 5px 12px 20px ${colors.transparentGrey(0.5)};
    background-color: ${colors.grey};
  }
`;

const CardTitle = styled.h3`
  margin-top: 0;
  color: ${colors.gradientTop};
`;

const CardLegend = styled.div`
  color: ${props => props.color};
`;

export default RepositoryOverview;
