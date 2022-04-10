import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Flex } from '../../atoms';
import { GithubUser } from '../../../store';
interface Props {

    item: GithubUser;
}

export const SuggestionsItem: React.FC<Props> = React.memo(({ item }) => {
    return (
        <Flex tag='a' className='list__item' role={'link'}>
            <Avatar url={item?.avatar_url} alt={item.login} />
            <p>{item.login}</p>
        </Flex>
    );
});
