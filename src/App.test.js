import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App'; // App component without graphql hoc

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
