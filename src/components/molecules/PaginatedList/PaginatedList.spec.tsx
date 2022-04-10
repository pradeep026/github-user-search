import React from 'react';
import { createEvent, fireEvent, render, waitFor } from '@testing-library/react';
import { PaginatedList } from './index';
import { act } from 'react-dom/test-utils';

describe(`Test PaginatedList component`, () => {

    it(`it renders when the data is empty`, () => {
        const { queryByTestId } = render(
           <PaginatedList
                data={[]}
                renderItem={(item, index) => {
                    return (
                        <div key={index}>{item}</div>
                    )
                }} />
        );
        expect(queryByTestId(`pagination`) as HTMLDivElement).not.toBeInTheDocument();
    });
    
    it(`it renders list and pagination when the data is not empty`, async () => {
        const data = Array.from({ length: 25 }).map((_, index) => `Test-${index}`);
        const pageSize = 10;
        const totalPageCount = Math.ceil(data.length / pageSize);
        const { queryByTestId } = render(
           <PaginatedList
                data={data}
                pageSize={pageSize}
                renderItem={(item, index) => {
                    return (
                        <span key={index} className={`git__tree-item`}>
                            {item}
                        </span>
                    )
                }} />
        );
        const paginationHtmlElement = queryByTestId(`pagination`) as HTMLDivElement;
        const paginationNextBtn = paginationHtmlElement.querySelector(`li.next`) as HTMLUListElement;
        const paginationPreviousBtn = paginationHtmlElement.querySelector(`li.previous`) as HTMLUListElement;
        expect(paginationHtmlElement).toBeInTheDocument();
        expect(paginationHtmlElement.querySelectorAll(`a.pagination__item`)).toHaveLength(Math.ceil(totalPageCount));
        expect(paginationNextBtn).toBeInTheDocument();
        expect(paginationPreviousBtn).toBeInTheDocument();
        
        const dataListHtmlElement = queryByTestId(`file__names-tree`) as HTMLDivElement;
        expect(dataListHtmlElement.querySelectorAll(`.git__tree-item`)).toHaveLength(10);
        expect(paginationPreviousBtn).toHaveClass(`disabled`);
        expect(paginationNextBtn).not.toHaveClass(`disabled`);
        fireEvent.click(paginationHtmlElement.querySelectorAll(`a.pagination__item`)[1] as HTMLAnchorElement);
        await waitFor(async () => {
            expect(paginationPreviousBtn).not.toHaveClass(`disabled`);
            expect(paginationNextBtn).not.toHaveClass(`disabled`);
            expect(dataListHtmlElement.querySelectorAll(`.git__tree-item`)).toHaveLength(10);
        });
        fireEvent.click(paginationHtmlElement.querySelectorAll(`a.pagination__item`)[2] as HTMLAnchorElement);
        await waitFor(async () => {
            expect(paginationPreviousBtn).not.toHaveClass(`disabled`);
            expect(paginationNextBtn).toHaveClass(`disabled`);
            expect(dataListHtmlElement.querySelectorAll(`.git__tree-item`)).toHaveLength(5);
        });
    });
});