import React from 'react';
import { UserProfile } from '../../../store';
import { Flex } from '../../atoms';
import { Avatar } from '../../atoms/Avatar';
import { Profile } from '../../molecules/Profile';
import './style.scss';

type Props = {
    userProfile?: null | UserProfile
}

export const GithubUserProfile: React.FC<Props> = ({ userProfile }) => {
    return (
        <Flex className='user__profile'>
            <Avatar
                size={`medium`}
                url={userProfile?.avatar_url ?? ``}
                alt={userProfile?.name} />
            <Profile profile={userProfile}/>
        </Flex>
    );
};
