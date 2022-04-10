import { RoutePaths } from '../../../router';
import { setupMockServer, renderPageUtils, waitFor, act, screen } from '../../../../__mock__/test-utils';
import { store } from '../../../store';

setupMockServer();

jest.mock(`react-router-dom`, () => ({
    ...jest.requireActual(`react-router-dom`),
    useLocation: () => ({
        state: {
            defaultBranch: `main`,
        },
    }),
}));

describe(`Integration Testing - User Profile and Repositories`, () => {
    
    it(`Assert page renders with files count and list of files`, async () => {
        const path = RoutePaths
                        .RepositoryInfoPage
                        .replace(`:id`, `test-123`)
                        .replace(`:name`, `react-demo-app`)
        renderPageUtils(path);
        await act(() => {
            expect((screen.getByTestId(`repo__name`) as HTMLSpanElement).innerHTML).toBe(`react-demo-app`);
            expect((screen.getByTestId(`branch__name`) as HTMLSpanElement).innerHTML).toBe(`main`);
        });

        await waitFor(async () => {
            const { githubRepository } = store.getState();
            expect(githubRepository.githubRepoTree).toHaveLength(30);
            const simpleListUlElement = screen.getByTestId(`simple--list`) as HTMLUListElement;
            expect(simpleListUlElement.querySelectorAll(`li`)).toHaveLength(30);
        })
    });

});
