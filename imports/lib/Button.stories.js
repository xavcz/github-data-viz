import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from './Button';

storiesOf('Lib.Button', module)
  .add('small', () => <Button>Yay</Button>)
  .add('big', () => <Button big>Yay</Button>);
