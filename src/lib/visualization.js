// Utils to get from raw to exploitable data

// flatten total count of issueish data
export const flattenData = repositories => repositories.map(
  ({ id, name, issues, pullRequests }) => ({
    id, 
    name, 
    issues: issues.totalCount, 
    pullRequests: pullRequests.totalCount 
  })
);

// sort by descending order on a key (issues or pullRequests)
export const sortDescByKey = key => repositoriesList => repositoriesList.sort((prev, curr) => curr[key] - prev[key]);

const formatRepositoriesData = repositories => sortDescByKey('issues')(flattenData(repositories));

export default formatRepositoriesData;
