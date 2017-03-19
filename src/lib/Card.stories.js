import React from 'react';
import { storiesOf, addDecorator } from '@kadira/storybook';

import Card from './Card';

storiesOf('Lib.Card', module)
  .add('example', () => <Card>Yay</Card>)
