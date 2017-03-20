import React from 'react';
import { storiesOf } from '@kadira/storybook';

import RepositoryOverview from './RepositoryOverview';

const mockedRepository = { id: 'a', name: 'apollo-client', issues: 101, pullRequests: 8 };
const mockedRepository2 = { id: 'a', name: 'some-repo', issues: 1, pullRequests: 0 };

storiesOf('App.RepositoryOverview', module)
  .add('loading state', () => (
    <RepositoryOverview totalRepositories={42} currentStatus="populating" />
  ))
  .add('populated', () => (
    <RepositoryOverview currentStatus="populated" />
  ))
  .add('standard display', () => <RepositoryOverview repository={mockedRepository} />)
  .add('shouldnt have "s" at end of labels', () => (
    <RepositoryOverview repository={mockedRepository2} />
  ));
