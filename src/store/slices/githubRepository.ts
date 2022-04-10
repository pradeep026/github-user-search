import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiUrls, Network } from '../../api';
import { GithubRepoTreeResponse, GitRepoTreeState } from './types';

export const initialState: GitRepoTreeState = {
    githubRepoTree: [],
    error: null,
};

type FetchAllFilesActionProp = {
    loginId: string;
    repoName: string;
    defaultBranch: string;
}

export const fetchAllFileByRepoName = createAsyncThunk('users/repo/allFiles',
    async ({ loginId, repoName, defaultBranch }: FetchAllFilesActionProp) => {
    try {
        if (!loginId || !repoName || !defaultBranch) {
            throw new Error(`Missing request params`);
        }
        const options = [
            { key: `loginid`, value: loginId },
            { key: `repository`, value: repoName },
            { key: `branch`, value: defaultBranch },
        ];
        const url = Network.buildUrlWithPathParams(ApiUrls.Users.RepositoryGitTree, options);
        const response = await new Network().makeGetRequest<string, GithubRepoTreeResponse>({
            url,
            params: {
                recursive: 1,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
});

export const githubRepositorySlice = createSlice({
    name: `githubRepoTree`,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFileByRepoName.fulfilled, (state, { payload }) => {
            state.githubRepoTree = payload.tree ?? [];
        });
        builder.addCase(fetchAllFileByRepoName.rejected, (state, { error }) => {
            state.githubRepoTree = [];
            state.error = (error as unknown as Error).message;
        });
    },
});

export default githubRepositorySlice.reducer;
