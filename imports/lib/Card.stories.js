import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Card, { CardTitle } from './Card';

storiesOf('Lib.Card', module)
  .add('simple', () => <Card>Yay</Card>)
  .add('with title', () => <Card><CardTitle>Oyoye</CardTitle><div>Nom nom nom</div></Card>);
