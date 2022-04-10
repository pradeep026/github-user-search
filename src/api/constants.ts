/**
 * Constants for API Url
 */
export const ApiUrls = {
    UserSearch: `/search/users`,
    Users: {
        Profile: `/users/:loginid`,
        Repositories: `/users/:loginid/repos`,
    },
} as const;
