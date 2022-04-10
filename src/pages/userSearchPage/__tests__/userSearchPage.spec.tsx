import { store } from '../../../store';
import {
    act,
    fireEvent,
    screen,
    waitFor,
    setupMockServer,
    renderPageUtils
} from '../../../../__mock__/test-utils';
import { RoutePaths } from '../../../router';

const sleep = () => new Promise(resolve => {
    setTimeout(resolve, 1000);
});

setupMockServer();

beforeEach(() => {
    renderPageUtils(RoutePaths.IndexPage);
});

describe(`Integration Testing - Github user search`, () => {
    
    it(`Assert initial screen renders`, async () => {
        await act(async () => {
            expect(screen.queryByText(/No Suggestions/i)).toBeInTheDocument();
            expect(screen.queryByRole('list')).not.toBeInTheDocument();
            expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
        });
    });
    
    it(`Assert when search query is entered`, async () => {
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
        });
        fireEvent.click(screen.queryAllByRole(`listitem`)[0]);
    });
});
