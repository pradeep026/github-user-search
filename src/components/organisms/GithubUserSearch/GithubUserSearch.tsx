import React, { useCallback, useEffect, useState } from 'react';
import { Search } from '../../molecules/Search';
import { Suggestions } from '../../molecules/Suggestions';
import { useDebounce } from '../../../hooks';
import { DEBOUNCE_TIME } from '../../../constants';
import { queryAllUsersByQueryString, RootState, useAppDispatch, useAppSelector } from '../../../store';
import './style.scss';
import { Flex } from '../../atoms';

export const GithubUserSearch: React.FC = () => {
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
        (selectedUser) => {
            console.log(`---- selected github user -- `, selectedUser);
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
