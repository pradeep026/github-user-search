import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiUrls, GithubUserQueryResponse, Network } from '../../api';
import { GithubSearchState } from './types';

export const initialState: GithubSearchState = {
    loading: false,
    queryResultOrSessions: [],
    error: null,
};

export const queryAllUsersByQueryString = createAsyncThunk(
    'githubUsers/queryAllUsers', async (queryString: string) => {
    try {
        const response = await new Network().makeGetRequest<string, GithubUserQueryResponse>({
            url: ApiUrls.UserSearch,
            params: { q: queryString },
        });
        return response;
    } catch (error) {
        throw error;
    }
});

export const githubUserSearchSlice = createSlice({
    name: `githubSearch`,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(queryAllUsersByQueryString.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(queryAllUsersByQueryString.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.queryResultOrSessions = payload.items;
        });
        builder.addCase(queryAllUsersByQueryString.rejected, (state, { error }) => {
            state.loading = false;
            state.error = (error as unknown as Error).message;
        });
    },
});

export const { } = githubUserSearchSlice.actions;

export default githubUserSearchSlice.reducer;
