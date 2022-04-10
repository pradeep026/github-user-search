import { ApiUrls } from '../../../api';
import {
    renderPageUtils,
    setupMockServer,
    waitFor,
    rest,
} from '../../../../__mock__/test-utils';
import githubRepositoryReducer, { initialState, fetchAllFileByRepoName } from '../githubRepository';
import { store } from '../..';
import { RoutePaths } from '../../../router';
import { act } from 'react-dom/test-utils';

const server = setupMockServer();

describe(`Tests githubRepositoryReducer`, () => {

    // it(`should return the initial state`, async () => {
    //     const state = githubRepositoryReducer(undefined, { type: null })   
    //     expect(state).toBe(initialState);
    // });
    
    it(`Assert async action - query user search by query string invokes API request`, async () => {
        store.dispatch(fetchAllFileByRepoName({
            loginId: `test-123`,
            repoName: `react-demo-app`,
            defaultBranch: `main`
        }));
        await waitFor(async () => {
           expect(store.getState().githubRepository.githubRepoTree).toHaveLength(30);
        });
    });
    
    it(`Assert user search api exception`, async () => {
        server.use(
            rest.get(ApiUrls.Users.RepositoryGitTree, (_, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({ item: [] }),
                );
            }),
        );
        await act(async () => {
            await store.dispatch(fetchAllFileByRepoName({
                loginId: `test-123`,
                repoName: `react-demo-app`,
                defaultBranch: `main`
            }));
        })
        await waitFor(async () => {
            expect(store.getState().githubRepository.githubRepoTree).toHaveLength(0);
        });
    });
});
