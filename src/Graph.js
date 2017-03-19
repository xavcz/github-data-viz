import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { BarChart, Bar } from 'recharts';
import { branch, renderComponent, pure, compose } from 'recompose';
import styled from 'styled-components';

import { spacing, fonts, colors, shimmeringText } from './lib/styles';
import { GITHUB_ORG_REPOS_DATA } from './lib/queries';
import formatRepositoriesData from './lib/visualization';

export const GraphPure = ({ repositories, stack = ['pullRequests', 'issues'], width, height }) => {
  
  const [ stackUp, stackBottom ] = stack;
  
  return (
    <RepositoriesChart 
      width={600}
      height={300}
      data={repositories}
    >
      <defs>
        <linearGradient id="stackBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={colors[stackBottom]} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={colors[stackBottom]} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <Bar 
        dataKey={stackUp} 
        stackId="issueish" 
        fill={colors[stackUp]} 
        animationBegin={400} 
        animationDuration={400} 
        animationEasing="linear" 
      />
      <Bar
        dataKey={stackBottom}
        stackId="issueish"
        animationBegin={0}
        animationDuration={400}
        animationEasing="linear"
        fillOpacity={1}
        fill="url(#stackBottom)"
      />
    </RepositoriesChart>
  );
};

GraphPure.propTypes = {
  repositories: PropTypes.array,
  repositoriesTotal: PropTypes.number,
  stack: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

const RepositoriesChart = styled(BarChart)`
  border-bottom: 2px dashed ${colors.grey};
`;

export const GraphPlaceholder = shimmeringText(styled.div`
  width: 600px;
  height: 300px;
  border-bottom: 2px dashed ${colors.grey};
  
  &:after {
    padding-top: ${spacing.single};
    font-size: ${fonts.large};
    color: ${colors.grey}
    content: "Drawing ${props => props.repositoriesTotal} repositories data...";
    display: flex;
    justify-content: center;
  }
`);

const withLoadingState = branch(
  props => true,
  renderComponent(GraphPlaceholder)
);

const withData = graphql(GITHUB_ORG_REPOS_DATA, {
  options: ({ reposCount }) => ({variables: { reposCount } }),
  props: ({ data: { loading, organization }, ownProps: { repositoriesTotal } }) => ({
    loading,
    repositories: organization && organization.repositories && formatRepositoriesData(organization.repositories.nodes), 
    repositoriesTotal,
  }),
});

const Graph = compose(
  withData,
  withLoadingState,
  pure,
)(GraphPure);

export default Graph;
