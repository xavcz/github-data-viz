import React from 'react';
import ReactDOM from 'react-dom';
import { AppPure } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
