import React from 'react';
import { storiesOf, addDecorator } from '@kadira/storybook';
import { shimmeringText } from './styles';
import Button from './Button';

storiesOf('Lib.Button', module)
  .add('small', () => <Button>Yay</Button>)
  .add('big', () => <Button big>Yay</Button>);
