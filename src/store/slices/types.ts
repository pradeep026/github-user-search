import { GithubUser } from "../../api";

export type GithubSearchState = {
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