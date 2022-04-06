import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../..';
import { ApiUrls } from '../../../api';
import App from '../../../app/App';
import githubSearchReducer, { initialState, queryAllUsersByQueryString } from '../githubSearch';

export const apiHandlers = [
    rest.get(ApiUrls.UserSearch, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(require(`../../../../__mock__/search_api_response.json`)),
        )
    })
];

const server = setupServer(...apiHandlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe(`Tests githubSearchReducer`, () => {

    it(`should return the initial state`, () => {       
        const state = githubSearchReducer(undefined, { type: null });
        expect(state).toBe(initialState);
    });
    
    it(`Assert async action - query user search by query string invokes API request`, async () => {
        render(
            <Provider store={store}>
              <App />
            </Provider>
        );
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
        render(
            <Provider store={store}>
              <App />
            </Provider>
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
