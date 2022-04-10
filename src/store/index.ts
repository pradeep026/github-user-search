import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import githubSearchReducer from './slices/githubSearch';
import userProfileReducer from './slices/userProfile';
import githubRepositoryReducer from './slices/githubRepository';

export const store = configureStore({
    reducer: {
        githubUserSearch: githubSearchReducer,
        user: userProfileReducer,
        githubRepository: githubRepositoryReducer,
    },
});

/**
 * export store slice actions
 */
export * from './slices/githubSearch';

export * from './slices/types';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
