import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator } from '@kadira/storybook';
import '../src/lib/styles';

// require all stories dynamically \o/
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

const StoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

addDecorator(story => <StoryWrapper>{story()}</StoryWrapper>);

configure(loadStories, module);
