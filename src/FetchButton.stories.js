import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { FetchButtonPure, statusList } from './FetchButton';

// note: I may "go too far" on this, but I find this pretty cool.

statusList
  .map(status => status.id)
  .reduce(
    (storiesOf, statusId) =>
      storiesOf.add(`${statusId} state`, () => <FetchButtonPure statusId={statusId} />),
    storiesOf('App.FetchButton', module)
  );

// above code is equal to:
// storiesOf('FetchButton', module)
//   .add('init state', () => <FetchButton statusId="init" />)
//   .add('loading state', () => <FetchButton statusId="loading" />)
//   .add('populating state', () => <FetchButton statusId="populating" />)
//   .add('refetch state', () => <FetchButton statusId="refetch" />);
