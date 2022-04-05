import React, { useCallback } from 'react';
import { assertIsFunction } from '../../../utils';
import { SimpleList } from '../../atoms';
import { SuggestionsItem, SuggestionItem } from './SuggestionsItem';

import './style.scss';

interface Props {
    /**
     * Array of auto suggestion - github user search list
     */
    data?: SuggestionItem[];

    onSelectItem?: (item: SuggestionItem) => void
}

export const Suggestions: React.FC<Props> = React.memo(({ data, onSelectItem }) => {
    const hasSuggestion = Array.isArray(data) && data?.length > 0;

    const __onSelectItem = useCallback(
        (selectedItem: SuggestionItem) => {
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
                        renderItem={(item) => (
                            <SuggestionsItem item={item} />
                        )}
                        onSelectItem={__onSelectItem} />
                ) : (
                    <p className='no__result'>No Suggestions</p>
                )
            }
        </div>
    );
});
