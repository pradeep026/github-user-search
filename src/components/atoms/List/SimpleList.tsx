import React, { ReactElement } from 'react';

interface Props<T> {
    /**
     *  data to rendered as list
     */
    data: T[];

    /**
     *
     * render function to return the list item
     */
    renderItem: (item: T, index: number) => ReactElement;

    /**
     * Callback function when an item is clicked from the list
     */
    onSelectItem?: (item: T, index: number) => void;
}

export const SimpleList = <T extends unknown>({ data, renderItem, onSelectItem }: Props<T>) => {
    return (
        <ul
            role={'list'}
            data-testid={'simple--list'}
            className='simple__list-component'>
            {
                data.map((item, index) => {
                    return (
                        <li
                            role={'listitem'}
                            key={index}
                            onClick={() => {
                                typeof onSelectItem === `function` && onSelectItem(item, index);
                            }}>
                            {renderItem(item, index)}
                        </li>
                    );
                })
            }
        </ul>
    );
};
