import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import githubSearchReducer from './slices/githubSearch';

export const store = configureStore({
    reducer: {
        githubUserSearch: githubSearchReducer,
    },
});

/**
 * export store slice actions
 */
export * from './slices/githubSearch';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
