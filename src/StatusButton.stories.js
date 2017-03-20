import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { StatusButtonPure, statusList } from './StatusButton';

// note: I may "go too far" on this, but I find this pretty cool.

statusList
  .map(status => status.id)
  .reduce(
    (storiesOf, status) =>
      storiesOf.add(`${status} state`, () => <StatusButtonPure currentStatus={status} />),
    storiesOf('App.StatusButton', module)
  );

// above code is equal to:
// storiesOf('StatusButton', module)
//   .add('init state', () => <StatusButton currentStatus="init" />)
//   .add('loading state', () => <StatusButton currentStatus="loading" />)
//   .add('populating state', () => <StatusButton currentStatus="populating" />)
//   .add('refetch state', () => <StatusButton currentStatus="refetch" />);
