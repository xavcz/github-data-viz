import { gql } from 'react-apollo';

// note: organization repositories schema has some troubles at the moment :-(
// see https://platform.github.community/t/organization-repositories-orderby-has-no-effect/1503

export const GITHUB_ORG_TOTAL_REPOS = gql`
query getOrganizationTotalRepositories {
  organization(login: "apollographql") {
    repositories(isFork: false) {
      totalCount
    }
  }
}
`;

export const GITHUB_ORG_REPOS_DATA = gql`
query getRepositoriesData($reposCount: Float) {
  organization(login: "apollographql") {
    path
    repositories(last: $reposCount, orderBy: {field: PUSHED_AT, direction: ASC}) {
      nodes {
        id
        name
        updatedAt
        pushedAt
        pullRequests(last: 1, states: OPEN) {
          totalCount
        }
        issues(last: 1, states: OPEN) {
          totalCount
        }
      }
    }
  }
}
`;

// export const GITHUB_PAGINATED_QUERY = gql`
// query getOrganizationData($cursor: String) {
//   organization(login: "apollographql") {
//     id
//     repositories(first: 10, isFork: false, orderBy: {field: UPDATED_AT, direction: ASC}, before: $cursor) {
//       edges {
//         cursor
//         repository: node {
//           id
//           name
//           updatedAt
//           pullRequests(last: 1, states: OPEN) {
//             totalCount
//           }
//           issues(last: 1, states: OPEN) {
//             totalCount
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//         hasPreviousPage
//         startCursor
//       }
//     }
//   }
// }
// `;
