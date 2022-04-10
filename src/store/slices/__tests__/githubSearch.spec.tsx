import { ApiUrls } from '../../../api';
import {
    renderPageUtils,
    setupMockServer,
    waitFor,
    rest,
} from '../../../../__mock__/test-utils';
import githubSearchReducer, { initialState, queryAllUsersByQueryString } from '../githubSearch';
import { store } from '../..';

const server = setupMockServer();

beforeAll(() => {
    renderPageUtils(`/`);
});

describe(`Tests githubSearchReducer`, () => {

    it(`should return the initial state`, () => {       
        const state = githubSearchReducer(undefined, { type: null });
        expect(state).toBe(initialState);
    });
    
    it(`Assert async action - query user search by query string invokes API request`, async () => {
        await waitFor(async () => {
            expect(store.getState().githubUserSearch.loading).toBeFalsy();
            store.dispatch(queryAllUsersByQueryString(`test`));
            expect(store.getState().githubUserSearch.loading).toBeTruthy();
        });
        await waitFor(async () => {
            const state = await store.getState();
            expect(store.getState().githubUserSearch.loading).toBeFalsy();
            expect(state.githubUserSearch.queryResultOrSessions).toHaveLength(3);
        });
    });
    
    it(`Assert user search api exception`, async () => {
        server.use(
            rest.get(ApiUrls.UserSearch, (req, res, ctx) => {
                return res(
                    ctx.status(422),
                    ctx.json({ message: `Validation Failed` }),
                );
            }),
        );
        await waitFor(async () => {
            expect(store.getState().githubUserSearch.loading).toBeFalsy();
            store.dispatch(queryAllUsersByQueryString(`test`));
            expect(store.getState().githubUserSearch.loading).toBeTruthy();
        });

        await waitFor(async() => {
            const state = await store.getState();
            expect(store.getState().githubUserSearch.loading).toBeFalsy();
            expect(state.githubUserSearch.error).toBe(`Validation Failed`);
            expect(state.githubUserSearch.queryResultOrSessions).toHaveLength(0);
        })
    });
});
