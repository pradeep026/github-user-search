import { RoutePaths } from '../../../router';
import { screen, waitFor, setupMockServer, renderPageUtils } from '../../../../__mock__/test-utils';

setupMockServer();

describe(`Integration Testing - User Profile and Repositories`, () => {
    
    it(`Assert initial screen renders`, async () => {
        const path = RoutePaths
                        .UserProfile
                        .replace(`:id`, `test-123`)
                        .replace(`:name`, `react-demo-app`);
        renderPageUtils(path);
        await waitFor(async () => {
            expect(screen.getByTestId(`loginid`)).toBeInTheDocument();
        });
    });
});
