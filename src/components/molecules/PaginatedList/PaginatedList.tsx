import React, { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Flex, SimpleList, SimpleListComponentProps } from '../../atoms';
import './style.scss';

interface Props<T> extends SimpleListComponentProps<T> {
    /**
     * No of items to be display per page
     */
    pageSize?: number
}

export const PaginatedList = <T extends unknown>({ data, renderItem, onSelectItem, pageSize = 10 }: Props<T>) => {
    const [list, setList] = useState<T[]>([]);
    const [activePageNo, setActivePageNo] = useState(0);

    useEffect(() => {
        const startIndex = activePageNo * pageSize;
        const endIndex = startIndex + pageSize;
        const __temp = data.slice(startIndex, endIndex);
        setList(__temp);
    }, [data, pageSize, activePageNo]);

    const __pageCount = useMemo(() => {
        return Math.ceil(data.length / pageSize);
    }, [data, pageSize]);

    const __onSelectPageNo = (selectedItem: { selected: number }) => {
        setActivePageNo(selectedItem?.selected);
    };

    return (
        <Flex direction={`column`} className={`paginated__list-component`}>
            <div className='git__files-tree' data-testid={`file__names-tree`}>
                <SimpleList
                    data={list}
                    renderItem={renderItem}
                    onSelectItem={onSelectItem} />
            </div>
            {
                data.length > pageSize &&
                <div className='pagination' aria-label='pagination' data-testid={`pagination`}>
                    <ReactPaginate
                        breakLabel={`...`}
                        nextLabel={`Next`}
                        previousLabel={`Previous`}
                        containerClassName={`pagination__list`}
                        pageLinkClassName={`pagination__item`}
                        previousLinkClassName={`btnPrevious`}
                        nextLinkClassName={`btnNext`}
                        onPageChange={__onSelectPageNo}
                        pageRangeDisplayed={pageSize}
                        pageCount={__pageCount}
                        marginPagesDisplayed={0} />
                </div>
            }
        </Flex>
    );
};
