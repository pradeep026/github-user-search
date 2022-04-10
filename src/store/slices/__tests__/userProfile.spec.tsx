import { rest } from 'msw';
import { store } from '../../index';
import { ApiUrls } from '../../../api';
import { setupMockServer, waitFor } from '../../../../__mock__/test-utils';
import userProfileReducer, {
    initialState, fetchUserProfileByLoginId, fetchRepositoriesByLoginId
} from '../userProfile';

const server = setupMockServer();

describe(`Tests userProfile reducer`, () => {

    it(`should return the initial state`, () => {       
        const state = userProfileReducer(undefined, { type: null });
        expect(state).toBe(initialState);
    });
    
    it(`Assert async action - `, async () => {
        store.dispatch(fetchUserProfileByLoginId(`test-123`));
        store.dispatch(fetchRepositoriesByLoginId(`test-123`));
        await waitFor(async () => {
            const state = await store.getState();
            expect(state.user.profile?.login).not.toBeNull();
            expect(state.user.listOfGitRepositories).toHaveLength(10);
        });
    });
    
    it(`Assert user search api exception`, async () => {
        server.use(
            rest.get(ApiUrls.Users.Profile, (_, res, ctx) => {
                return res(
                    ctx.status(404),
                    ctx.json({ message: `Not Found` }),
                );
            }),
            rest.get(ApiUrls.Users.Repositories, (_, res, ctx) => {
                return res(
                    ctx.status(404),
                    ctx.json({ message: `Not Found` }),
                );
            }),
        );
        store.dispatch(fetchUserProfileByLoginId(`test-123`));
        store.dispatch(fetchRepositoriesByLoginId(`test-123`));
        await waitFor(async() => {
            const state = await store.getState();
            expect(state.user.profile).toBeNull();
            expect(state.user.listOfGitRepositories).toHaveLength(0);
        });
    });
});
