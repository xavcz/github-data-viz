// Utils to get from raw to exploitable data

// flatten total count of issueish data
export const flattenData = repositories => repositories.map((
  { id, name, issues, pullRequests }
) => ({
  id,
  name,
  issues: issues.totalCount,
  pullRequests: pullRequests.totalCount,
}));

export const filterEmpty = repositories =>
  repositories.filter(repo => repo.issues && repo.pullRequests);

// sort by descending order on a key (issues or pullRequests)
export const sortDescByKey = key =>
  repositoriesList => repositoriesList.sort((prev, curr) => curr[key] - prev[key]);

// flatten repositories, filter ones without issues and prs, then sort by issues
// note: there could be some control to sort either by issues or pull requests
const formatRepositoriesData = repositories =>
  sortDescByKey('issues')(filterEmpty(flattenData(repositories)));

export default formatRepositoriesData;
