import React from 'react';
import { storiesOf, addDecorator } from '@kadira/storybook';

import RepositoryOverview from './RepositoryOverview';

const mockedRepository = {id: 'a', name: 'apollo-client', issues: 101, pullRequests: 8};
const mockedRepository2 = {id: 'a', name: 'some-repo', issues: 1, pullRequests: 0};

storiesOf('App.RepositoryOverview', module)
  .add('standard display', () => <RepositoryOverview repository={mockedRepository} />)
  .add('shouldnt have "s" at end of labels', () => <RepositoryOverview repository={mockedRepository2} />)
