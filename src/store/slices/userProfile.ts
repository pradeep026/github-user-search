import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiUrls, Network } from '../../api';
import { Repository, UserProfile, UserProfileState } from './types';

export const initialState: UserProfileState = {
    profile: null,
    error: null,
    listOfGitRepositories: [],
};

export const fetchUserProfileAndPublicReposByLoginId = createAsyncThunk('users/profileAndRespose',
    async (loginid: string): Promise<{ profileResult: UserProfile; repositoriesResult: Repository[] }> => {
        const options = [
            {   key: `loginid`, value: loginid },
        ];
        const profileRequestUrl = Network.buildUrlWithPathParams(ApiUrls.Users.Profile, options);
        const repositoriesRequestUrl = Network.buildUrlWithPathParams(ApiUrls.Users.Repositories, options);
        try {
            const profileResult: UserProfile = await new Network()
                            .makeGetRequest<string, UserProfile>({ url: profileRequestUrl });
            const repositoriesResult: Repository[] = await new Network()
                                .makeGetRequest<string, Repository[]>({ url: repositoriesRequestUrl });
            return {
                profileResult,
                repositoriesResult,
            };
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
        builder.addCase(fetchUserProfileAndPublicReposByLoginId.pending, (state) => {
            state.listOfGitRepositories = [];
        });
        builder.addCase(fetchUserProfileAndPublicReposByLoginId.fulfilled, (state, { payload }) => {
            // const [profileSettleResult, repositorySettleResult] = payload;
            state.profile = payload.profileResult ?? null;
            state.listOfGitRepositories = payload.repositoriesResult ?? null;
        });
        builder.addCase(fetchUserProfileAndPublicReposByLoginId.rejected, (state, { error }) => {
            state.profile = null;
            state.listOfGitRepositories = [];
            state.error = error?.message;
        });
    },
});

export default userProfileSlice.reducer;
