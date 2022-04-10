import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Network } from '../../api';
import { GithubRepoTreeResponse, GitRepoTreeState } from './types';

export const initialState: GitRepoTreeState = {
    githubRepoTree: [],
};

type FetchAllFilesActionProp = {
    loginId: string;
    repoName: string;
    defaultBranch: string;
}

export const fetchAllFileByRepoName = createAsyncThunk('users/repo/allFiles',
    async ({ loginId, repoName, defaultBranch }: FetchAllFilesActionProp) => {
    try {
        const url = `/repos/${loginId}/${repoName}/git/trees/${defaultBranch}`;
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
            state.githubRepoTree = payload.tree;
        });
        builder.addCase(fetchAllFileByRepoName.rejected, (state, { error }) => {
            state.githubRepoTree = [];
        });
    },
});

export default githubRepositorySlice.reducer;
