import React, { PropTypes } from 'react';
import { BarChart, Bar } from 'recharts';
import { lifecycle, branch, renderComponent, pure, compose } from 'recompose';
import styled from 'styled-components';

import { spacing, colors, shimmeringText } from './lib/styles';

export const GraphPure = (
  { selectRepository, repositories, stack = ['pullRequests', 'issues'], width, height }
) => {
  const [stackUp, stackBottom] = stack;

  // "filter" the data registered in the state for the selected repository
  const handleSelectRepository = ({ id, name, issues, pullRequests }) =>
    selectRepository({ id, name, issues, pullRequests });

  return (
    <RepositoriesChart
      // TODO: create a hoc to handle these values from the props
      width={600}
      height={300}
      data={repositories}
    >
      <defs>
        <linearGradient id="stackBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={colors[stackBottom]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={colors[stackBottom]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Bar
        dataKey={stackUp}
        stackId="issueish"
        fill={colors[stackUp]}
        animationBegin={400}
        animationDuration={400}
        animationEasing="linear"
        onMouseEnter={handleSelectRepository}
      />
      <Bar
        dataKey={stackBottom}
        stackId="issueish"
        animationBegin={0}
        animationDuration={400}
        animationEasing="linear"
        onMouseEnter={handleSelectRepository}
        fillOpacity={1}
        fill="url(#stackBottom)"
      />
    </RepositoriesChart>
  );
};

GraphPure.propTypes = {
  repositories: PropTypes.array,
  stack: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  selectRepository: PropTypes.func,
};

const RepositoriesChart = styled(BarChart)`
  border-bottom: 2px dashed ${colors.grey};
  margin-bottom: ${spacing.half};
`;

export const GraphPlaceholder = shimmeringText(
  styled.div`
  width: 600px;
  height: 300px;
  border-bottom: 2px dashed ${colors.grey};
`
);

const withLoadingState = branch(props => props.loading, renderComponent(GraphPlaceholder));

const triggerPopulated = lifecycle({
  componentDidMount() {
    this.props.selectRepository(null);
  },
});

const Graph = compose(withLoadingState, triggerPopulated, pure)(GraphPure);

export default Graph;
