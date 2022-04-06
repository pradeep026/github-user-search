import React from 'react';
import { Flex } from '../../components/atoms';
import { GithubUserSearch } from '../../components/organisms/GithubUserSearch';
import './style.scss';

export const UserSearchPage: React.FC = () => {
    return (
        <Flex tag={`div`} direction={'column'} className='home__page'>
            <h1 className='page__title'>Github User Search</h1>
            <GithubUserSearch />
        </Flex>
    );
};
