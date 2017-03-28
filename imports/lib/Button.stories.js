import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from './Button';
import { HubotIcon } from 'react-octicons-svg';

storiesOf('Lib.Button', module)
  .add('small', () => <Button>Yay</Button>)
  .add('big', () => <Button big>Yay</Button>)
  .add('with icon', () => <Button big><HubotIcon /> 42</Button>)
  .add('disabled', () => <Button big disabled><HubotIcon /> No way you click me</Button>);
