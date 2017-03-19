import React from 'react';
import ReactDOM from 'react-dom';
import { FetchButtonPure } from './FetchButton';

it('the button works with a "registered" status', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FetchButtonPure statusId='init' />, div);
});
