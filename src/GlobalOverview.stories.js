import React from 'react';
import { storiesOf } from '@kadira/storybook';

import GlobalOverview from './GlobalOverview';

storiesOf('App.GlobalOverview', module)
  .add('graph notes', () => <GlobalOverview totalRepositories={1337} />)
