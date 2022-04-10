import React, { useCallback } from 'react';
import { SimpleList } from '../../atoms';
import { SuggestionsItem } from './SuggestionsItem';
import { assertIsFunction } from '../../../utils';
import { GithubUser } from '../../../store';

import './style.scss';
interface Props {
    /**
     * Array of auto suggestion - github user search list
     */
    data?: GithubUser[];

    onSelectItem?: (item: GithubUser) => void
}

const NoResultState: React.FC = () => {
    return (
        <p className='no__result'>No Suggestions</p>
    );
};

export const Suggestions: React.FC<Props> = React.memo(({ data, onSelectItem }) => {
    const hasSuggestion = Array.isArray(data) && data?.length > 0;

    const __onSelectItem = useCallback(
        (selectedItem: GithubUser) => {
            assertIsFunction(onSelectItem) &&
                onSelectItem(selectedItem);
        },
    []);

    return (
        <div className='search__result-list'>
            {
                hasSuggestion ?
                (
                    <SimpleList
                        data={data}
                        renderItem={(item, index) => (
                            <SuggestionsItem key={index} item={item} />
                        )}
                        onSelectItem={__onSelectItem} />
                ) : (
                    <NoResultState />
                )
            }
        </div>
    );
});
