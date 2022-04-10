import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { store } from '../src/store';
import { ApiUrls } from '../src/api';
import AppRouter from '../src/router';

const apiHandlers = [
    rest.get(ApiUrls.UserSearch, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(require(`./search_api_response.json`)),
        )
    }),
    rest.get(ApiUrls.Users.Profile, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(require(`./user_profile_response.json`)),
        )
    }),
    rest.get(ApiUrls.Users.Repositories, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(require(`./user_repos_response.json`)),
        )
    }),
    rest.get(ApiUrls.Users.RepositoryGitTree, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(require(`./git_files_tree_response.json`)),
        )
    }),
    rest.get(`/repos/:loginid/:repo/git/blobs/:sha`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(require(`./readme_response.json`)),
        );
    }),
];

export const setupMockServer = () => {

    const server = setupServer(...apiHandlers)

    beforeAll(() => server.listen())
    
    afterEach(() => server.resetHandlers())
    
    afterAll(() => server.close());
    
    return server
};

export const renderPageUtils = (pathname: string) => {
    const history = createMemoryHistory ();
    const renderResult = render(
        <Provider store={store}>
           <Router location={pathname} navigator={history}>
                <AppRouter />
            </Router>
        </Provider>
    );
    return {
        history,
        ...renderResult
    };
};

export { rest } from 'msw';
export * from '@testing-library/react';
