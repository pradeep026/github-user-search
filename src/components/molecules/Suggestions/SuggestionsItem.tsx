import React from 'react';
import { Avatar } from '../../atoms/Avatar';

export type SuggestionItem = {

    /**
     * github id value to be used to query user's profile and repository list
     */
    login: string;

    /**
     * Display value of User
     *
     */
     avatar_url: string;

     id?: number;

     node_id?: string;
}

interface Props {

    item: SuggestionItem;
}

export const SuggestionsItem: React.FC<Props> = React.memo(({ item }) => {
    return (
        <div className='list__item'>
            <Avatar url={item?.avatar_url} />
            <p>{item.login}</p>
        </div>
    );
});
