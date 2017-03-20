import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

it('is a flaky test', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});
