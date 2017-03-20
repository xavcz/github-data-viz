import React from 'react';
import ReactDOM from 'react-dom';
import { StatusButtonPure } from './StatusButton';

it('the button works with a "registered" status', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StatusButtonPure currentStatus='init' />, div);
});
