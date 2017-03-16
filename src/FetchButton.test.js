import React from 'react';
import ReactDOM from 'react-dom';
import { FetchButtonPure } from './FetchButton';

it('the button works with default status', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FetchButtonPure />, div);
});
