import { gql } from 'react-apollo';

// note: organization repositories schema has some troubles at the moment :-(
// see https://platform.github.community/t/organization-repositories-orderby-has-no-effect/1503

export const GITHUB_ORG_TOTAL_REPOS = gql`
query getOrganizationTotalRepositories {
  # the name of the organization could be passed as a variable,
  # however that's not the point of this experiment
  organization(login: "apollographql") {
    id
    repositories(isFork: false) {
      totalCount
    }
  }
}
`;

export const GITHUB_ORG_REPOS_DATA = gql`
query getRepositoriesData($totalRepositories: Int) {
  # the name of the organization could be passed as a variable,
  # however that's not the point of this experiment
  organization(login: "apollographql") {
    id
    repositories(last: $totalRepositories, isFork: false, orderBy: {field: PUSHED_AT, direction: ASC}) {
      edges {
        node {
          id
          name
          pullRequests(states: OPEN) {
            totalCount
          }
          issues(states: OPEN) {
            totalCount
          }
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
//           pullRequests(states: OPEN) {
//             totalCount
//           }
//           issues(states: OPEN) {
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
