import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SimpleList } from './index';


describe(`Tests List component`, () => {

    it(`SimpleList component renders`, () => {
        // Mock data
        const data = Array.from({ length: 5 }).map((_, index) => `Test ${index + 1}`);
        const { getByTestId, getByText } = render(
            <SimpleList
                data={data}
                renderItem={(item) => {
                    return <p>{item}</p>
                }} />
        );
        getByTestId(`simple--list`);
        data.forEach((item) => {
            expect(getByText(item)).toBeInTheDocument();
        });
    });

    it(`Assert click of an list item calls with selected item and its index value`, () => {
        // Mock data
        const data = Array.from({ length: 5 }).map((_, index) => `Test ${index + 1}`);
        const onSelectItem = jest.fn();
        const { queryAllByRole } = render(
            <SimpleList
                data={data}
                onSelectItem={onSelectItem}
                renderItem={(item) => {
                    return <p>{item}</p>
                }} />
        );
        
        const listItemElements = (queryAllByRole(`listitem`) as HTMLUListElement[]);
        expect(listItemElements).toHaveLength(data.length);
        // Assert click each item calls with selected item value and index
        listItemElements.forEach((listItemElement, index) => {
            fireEvent.click(listItemElement);
            expect(onSelectItem).toBeCalledWith(data[index], index);
        });
    });

    it(`SimpleList component renders list of object`, () => {
        // Mock data
        const data = Array.from({ length: 5 }).map((_, index) => ({
            label: `Test ${index + 1}`,
        }));
        const onSelectItem = jest.fn();
        const { queryAllByRole } = render(
            <SimpleList
                data={data}
                onSelectItem={onSelectItem}
                renderItem={(item) => {
                    return <p>{item.label}</p>
                }} />
        );
        
        const listItemElements = (queryAllByRole(`listitem`) as HTMLUListElement[]);
        expect(listItemElements).toHaveLength(data.length);
        // Assert click each item calls with selected item value and index
        listItemElements.forEach((listItemElement, index) => {
            fireEvent.click(listItemElement);
            expect(onSelectItem).toBeCalledWith(data[index], index);
        });
    });
});
