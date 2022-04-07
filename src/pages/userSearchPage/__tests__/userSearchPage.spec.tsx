import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import App from '../../../app/App';
import { store } from '../../../store';
import { ApiUrls } from '../../../api';

const sleep = () => new Promise(resolve => {
    setTimeout(resolve, 1000);
});

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

describe(`Integration Testing - Github user search`, () => {
    
    it(`Assert initial screen renders`, async () => {
        render(<App />);
        await act(async () => {
            expect(screen.queryByText(/No Suggestions/i)).toBeInTheDocument();
            expect(screen.queryByRole('list')).not.toBeInTheDocument();
            expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
        });
    });
    
    it(`Assert when search query is entered`, async () => {
        render(<App />);
        let searchText = `test`;
        fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: searchText }});
        expect((screen.getByPlaceholderText(/Search/i) as HTMLInputElement)).toHaveValue(searchText);
        await act(async () => {
            await sleep();
        });
        await act(async () => {
            expect(store.getState().githubUserSearch.loading).toBeTruthy();
        });
        await waitFor(async () => {
            const state = await store.getState();
            expect(state.githubUserSearch.loading).toBeFalsy();
            expect(state.githubUserSearch.queryResultOrSessions).toHaveLength(3);
            expect(screen.queryByRole(`list`)).toBeInTheDocument();
            expect(screen.queryAllByRole(`listitem`)).toHaveLength(3);
            fireEvent.click(screen.queryAllByRole(`listitem`)[0]);
        });
    });
});
