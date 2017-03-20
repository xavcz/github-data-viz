[![Build Status](https://travis-ci.org/xavcz/github-data-viz.svg?branch=master)](https://travis-ci.org/xavcz/github-data-viz)

### GitHub Data Visualization

:octocat:
This small app is: 
- build with React with only functional component + recompose
- consumes GitHub GraphQL API thanks to `react-apollo`
- styled with`styled-components`
- powered with Meteor

Create a `settings.json` file at the root of the project & add [your own GitHub Token](https://github.com/settings/tokens) with at least `read:org` access to the file:

```json
{
  "public": {
    "GITHUB_TOKEN": "xxx"
  }
}
```

```sh
yarn
yarn start
```

Storybook:
```sh
yarn storybook
```

Sketch draft:
![sketch draft](https://d3uepj124s5rcx.cloudfront.net/items/1V3p2i121e21291w1k2P/draft.png?v=5c1b23d9)
