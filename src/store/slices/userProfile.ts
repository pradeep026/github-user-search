import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiUrls, Network } from '../../api';
import { Repository, UserProfile, UserProfileState } from './types';

export const initialState: UserProfileState = {
    profile: null,
    listOfGitRepositories: [],
};

export const fetchUserProfileByLoginId = createAsyncThunk(
    'users/profile', async (loginid?: string) => {
    try {
        const url = Network.buildUrlWithPathParams(ApiUrls.Users.Profile, `loginid`, `${loginid}`);
        const response = await new Network()
            .makeGetRequest<string, UserProfile>({ url });
        return response;
    } catch (error) {
        throw error;
    }
});

export const fetchRepositoriesByLoginId = createAsyncThunk(
    'users/githubRepositories', async (loginid?: string) => {
    try {
        const url = Network.buildUrlWithPathParams(ApiUrls.Users.Repositories, `loginid`, `${loginid}`);
        const response = await new Network()
            .makeGetRequest<string, Repository[]>({ url });
        return response;
    } catch (error) {
        throw error;
    }
});

export const userProfileSlice = createSlice({
    name: `userProfile`,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Builder Case for Fetch Github User Profile
        builder.addCase(fetchUserProfileByLoginId.fulfilled, (state, { payload }) => {
            state.profile = payload;
        });
        builder.addCase(fetchUserProfileByLoginId.rejected, (state, { error }) => {
            state.profile = null;
        });
        // Builder Case for Fetch Github Repositories
        builder.addCase(fetchRepositoriesByLoginId.fulfilled, (state, { payload }) => {
            state.listOfGitRepositories = payload;
        });
        builder.addCase(fetchRepositoriesByLoginId.rejected, (state, { error }) => {
            state.listOfGitRepositories = [];
        });
    },
});

export default userProfileSlice.reducer;
