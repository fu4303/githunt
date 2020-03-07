export const baseQuery = `query searchRepos($qstr: String!, $first: Int!, $after: String) {
  search(
    query: $qstr,
    type: REPOSITORY,
    first: $first,
    after: $after
  ) {
    repositoryCount
    pageInfo {
      startCursor
      endCursor
    }
    nodes {
      ... on Repository {
        name
        url
        createdAt
        updatedAt
        pushedAt
        description
        primaryLanguage {color name}
        isFork
        forkCount
        repositoryTopics(first:5) {
          nodes {
            #resourcePath
            topic {
              name
              #relatedTopics {
              #  name
              #}
            }
          }
        }
        stargazers {
          totalCount
        }
        owner {
          login
          avatarUrl
        }
      }
    }
  }
}`
