import React from 'react';
import { Flex } from '../../atoms';
import { UserProfile } from '../../../store';
import './style.scss';

interface Props {
    profile?: null | UserProfile
}

export const Profile: React.FC<Props> = React.memo(({ profile }) => {
    return (
        <Flex direction='row' className='profile__component'>
            <Flex direction='column'>
                <h2 className='full__name'>{profile?.name}</h2>
                <p className='bio__data'>{profile?.bio}</p>
                <a
                    role={'link'}
                    data-testid={`loginid`}
                    href={profile?.html_url ?? ``}
                    className={`github__login-id`}
                    target={`_blank`}>
                    @{profile?.login}
                </a>
                <Flex className='insights'>
                    <Flex direction='column'>
                        <label>Followers</label>
                        <span>{profile?.followers}</span>
                    </Flex>
                    <Flex direction='column'>
                        <label>Public Repositories</label>
                        <span>{profile?.public_repos}</span>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
});
