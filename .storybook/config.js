import { configure } from '@kadira/storybook';
import '../src/index.css';

// require all stories dynamically \o/
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
