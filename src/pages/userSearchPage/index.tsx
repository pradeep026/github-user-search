import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../../components/atoms';
import { GithubUserSearch } from '../../components/organisms/GithubUserSearch';
import './style.scss';

export const UserSearchPage: React.FC = () => {
    const navigate = useNavigate();
    const __goToUserProfile = (githubLoginId: string) => {
        navigate(`/users/${githubLoginId}`);
    };

    return (
        <Flex tag={`div`} direction={'column'} className='home__page'>
            <h1 className='page__title'>Github User Search</h1>
            <GithubUserSearch goToUserProfile={__goToUserProfile}/>
        </Flex>
    );
};
