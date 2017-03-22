> :dizzy_face: Github GraphQL API Bug: The API was working well until few days ago, thread about the issue: https://platform.github.community/t/something-went-wrong-while-executing-your-query-this-is-most-likely-a-github-bug/1521/5?u=xavcz

:octocat:

[![Build Status](https://travis-ci.org/xavcz/github-data-viz.svg?branch=master)](https://travis-ci.org/xavcz/github-data-viz)

# GitHub Data Visualization

### What's up?
Display Apollo Graphql organization repositories issueish data: open issues / pull requests on each repositories.

### App guts 
- build with React with only functional component + recompose
- consumes GitHub GraphQL API thanks to `react-apollo`
- styled with`styled-components`
- powered with Meteor

Create a `settings.json` file at the root of the project & add [your own GitHub Token](https://github.com/settings/tokens) with at least `repo` & `read:org` access to the file:

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

### What are the next steps to optimize the user experience?
Here are some ideas:
- Smoother transitions and motions thanks to `react-addons-transition-group` and/or `react-motion`.
- Jest snapshots coupled with storybook
- Handle mobile layout with media queries
- Faster page load with server-side rendering by coupling `WebApp` & `react-apollo`.
- Faster page load with dynamic imports `import(...)`.
- More control over repositories data : infos about opened issues / PRs, ability to preview them.

### Sketch draft of the app
![sketch draft](https://d3uepj124s5rcx.cloudfront.net/items/1V3p2i121e21291w1k2P/draft.png?v=5c1b23d9)
