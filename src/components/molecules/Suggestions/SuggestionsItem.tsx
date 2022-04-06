import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import { GithubUser } from '../../../api';
interface Props {

    item: GithubUser;
}

export const SuggestionsItem: React.FC<Props> = React.memo(({ item }) => {
    return (
        <a className='list__item' role={'link'}>
            <Avatar url={item?.avatar_url} alt={item.login} />
            <p>{item.login}</p>
        </a>
    );
});
