/**
 * Constants for API Url
 */
export const ApiUrls = {
    UserSearch: `/search/users`,
    Users: {
        Profile: `/users/:loginid`,
        Repositories: `/users/:loginid/repos`,
        RepositoryGitTree: `/repos/:loginid/:repository/git/trees/:branch`,
        ReadMeFileBlob: `/repos/:loginid/:repository/git/blobs/:sha`,
    },
} as const;
