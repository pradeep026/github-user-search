import React from 'react';
import { GithubUserSearch } from '../../components/organisms/GithubUserSearch';
import './style.scss';

export const UserSearchPage: React.FC = () => {
    return (
        <div className='home__page'>
            <h1 className='page__title'>Github User Search</h1>
            <GithubUserSearch />
        </div>
    );
};
