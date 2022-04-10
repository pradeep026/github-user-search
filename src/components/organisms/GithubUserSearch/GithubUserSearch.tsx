import React, { useCallback, useEffect, useState } from 'react';
import { Search } from '../../molecules/Search';
import { Suggestions } from '../../molecules/Suggestions';
import { Flex } from '../../atoms';
import { useDebounce } from '../../../hooks';
import { DEBOUNCE_TIME } from '../../../constants';
import { GithubUser, queryAllUsersByQueryString, RootState, useAppDispatch, useAppSelector } from '../../../store';
import './style.scss';


type Props = {
    goToUserProfile: (githubLoginId: string) => void;
}

export const GithubUserSearch: React.FC<Props> = ({ goToUserProfile }) => {
    const [searchQuery, setSearchQuery] = useState<string>(``);
    const debounceSearchQuery = useDebounce(searchQuery, DEBOUNCE_TIME);
    const githubUserSearch = useAppSelector((store: RootState) => store.githubUserSearch);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Dispatch action to fetch api call from here
        if (!!debounceSearchQuery) {
            dispatch(queryAllUsersByQueryString(debounceSearchQuery));
        }
    }, [debounceSearchQuery]);

    const __onSearchValueChange = (value: string) => {
        setSearchQuery(value);
    };

    const __onSelectGithubUser = useCallback(
        (selectedUser: GithubUser) => {
            goToUserProfile(selectedUser.login);
        },
        [],
    );

    return (
        <Flex tag={`div`} direction={`column`} className='github__user-search'>
            <div className='search__container'>
                <Search
                    placeholder='Search a github user name'
                    onValueChange={__onSearchValueChange}/>
            </div>
            <div className='suggestion__list'>
                <Suggestions
                    data={githubUserSearch.queryResultOrSessions}
                    onSelectItem={__onSelectGithubUser}
                    />
            </div>
        </Flex>
    );
};
