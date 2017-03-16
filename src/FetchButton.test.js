import React from 'react';
import ReactDOM from 'react-dom';
import FetchButton from './FetchButton';

it('the button works with default status', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FetchButton />, div);
});
