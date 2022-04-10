export interface GithubUserQueryResponse {
    total_count:        number;
    incomplete_results: boolean;
    items:              GithubUser[];
}

export interface GithubUser {
    login:               string;
    id?:                  number;
    node_id?:             string;
    avatar_url:          string;
    gravatar_id?:         string;
    url?:                 string;
    html_url?:            string;
    followers_url?:       string;
    following_url?:       string;
    gists_url?:           string;
    starred_url?:         string;
    subscriptions_url?:   string;
    organizations_url?:   string;
    repos_url?:           string;
    events_url?:          string;
    received_events_url?: string;
    type?:                string;
    site_admin?:          boolean;
    score?:               number;
}

export interface GithubSearchState {
    /**
     * State of API request - pending / fullfilled
     */
    loading: boolean;

    /**
     * Error message when the request is failed
     */
    error: null | string;

    /**
     * User input - search query text
     */
    queryResultOrSessions: GithubUser [];
}

/** Github User Profile Response */

export interface UserProfile {
    login:              string;
    id:                 number;
    nodeID:             string;
    avatar_url:         string;
    gravatar_id:        string;
    url:                string;
    html_url:           string;
    followers_url:      string;
    following_url:      string;
    gistsURL:           string;
    starredURL:         string;
    subscriptions_url:  string;
    organizations_url:  string;
    reposURL:           string;
    eventsURL:          string;
    received_events_url: string;
    type:               string;
    site_admin:         boolean;
    name:               string;
    company:            string;
    blog:               string;
    location:           string;
    email:              null;
    hireable:           null;
    bio:                string;
    twitter_username?:  null;
    public_repos:       number;
    public_gists:       number;
    followers:          number;
    following:          number;
    created_at:         Date;
    updated_at:         Date;
}

export interface Repository {
    id:             number;
    node_id:        string;
    name:           string;
    full_name:      string;
    private:        boolean;
    html_url:       string;
    description:    string;
    url:            string;
    created_at:     Date;
    updated_at:     Date;
    pushed_at:      Date;
    homepage:       null;
    size:           number;
    watchers_count: number;
    language:       string;
    archived:       boolean;
    disabled:       boolean;
    topics:         string[];
    visibility:     string;
    forks:          number;
    open_issues:    number;
    watchers:       number;
    default_branch: string;
}

export interface UserProfileState {
     /**
      * User input - search query text
      */
     profile?: null | UserProfile;

     /**
      * List of public github repositories by user
      */
     listOfGitRepositories: Repository[];

     /**
      * List of error messages
      */
     error: string | undefined | null;
}

// Git Repository Files API reponse
export interface GithubRepoTreeResponse {
    sha:       string;
    url:       string;
    tree:      GitFileTree[];
    truncated: boolean;
}

export interface GitFileTree {
    path:  string;
    mode:  string;
    sha:   string;
    size?: number;
    url:   string;
    type:  `blob` | `tree`;
}
export interface GitRepoTreeState {
    /**
     * All files in the git repo
     */
    githubRepoTree?: GitFileTree[];

    /**
     * Error message when the api request is failed or empty repo is returned
     */
    error: string | undefined | null;
}

