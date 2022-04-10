import { ApiUrls } from './constants';
import { BuildPathParamOption, Network } from './network';

it(`Build params returns same value when options is empty`, () => {

    let options: BuildPathParamOption[] = [];
    let url = Network.buildUrlWithPathParams(ApiUrls.UserSearch, options);
    expect(url).toEqual(`/search/users`);

    url = Network.buildUrlWithPathParams(`/user/repo/name`, options);
    expect(url).toEqual(`/user/repo/name`);
});

it(`Build params replaces key value and returns new url`, () => {

    let options = [
        { key: `loginid`, value: `test-123` },
    ];
    let url = Network.buildUrlWithPathParams(ApiUrls.Users.Profile, options)
    expect(url).toEqual(`/users/test-123`);

    options = [
        { key: `loginid`, value: `test-123` },
        { key: `repository`, value: `react-demo` },
        { key: `branch`, value: `main` },
    ];
    url = Network.buildUrlWithPathParams(ApiUrls.Users.RepositoryGitTree, options);
    expect(url).toEqual(`/repos/test-123/react-demo/git/trees/main`);
});
