import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Header from './Header';

storiesOf('App.Header', module)
  .add('column display', () => <Header />)
  .add('inline display', () => <Header inline />);
