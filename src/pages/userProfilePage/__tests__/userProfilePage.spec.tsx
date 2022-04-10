import { RoutePaths } from '../../../router';
import { screen, waitFor, setupMockServer, renderPageUtils } from '../../../../__mock__/test-utils';

setupMockServer();

describe(`Integration Testing - User Profile and Repositories`, () => {
    
    it(`Assert initial screen renders`, async () => {
        const path = RoutePaths
                        .UserProfile
                        .replace(`:id`, `test-user`)
                        .replace(`:name`, `test-repo`);
        renderPageUtils(path);
        await waitFor(async () => {
            expect(screen.queryByText(/test-123/i)).toBeInTheDocument();
        });
    });
});
