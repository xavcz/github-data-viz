import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Graph from './Graph';

const mockedData = [
  {id: 'a', name: 'apollo-client', issues: 101, pullRequests: 8},
  {id: 'b', name: 'react-apollo', issues: 70, pullRequests: 5},
  {id: 'c', name: 'frontpage-server', issues: 3, pullRequests: 15},
  {id: 'd', name: 'apollo-client-devtools', issues: 12, pullRequests: 1},
  {id: 'e', name: 'core-docs', issues: 45, pullRequests: 3},
  {id: 'f', name: 'apollo-angular', issues: 8, pullRequests: 6},
];

storiesOf('App.Graph', module)
  .add('graph placeholder', () => <Graph loading />)
  .add('default: bottom stacked data = issues', () => <Graph repositories={mockedData} setSelectedBar={data => console.log(data)} />)
  .add('alternative: bottom stacked data = prs', () => <Graph repositories={mockedData} stack={['issues', 'pullRequests']} setSelectedBar={data => console.log(data)} />)
