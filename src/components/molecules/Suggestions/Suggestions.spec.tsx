import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Suggestions } from './index';

const createMockSuggestionData = (length: number) => {
    return Array.from({ length }).map((_, index) => {
        return {
            login: `Test ${index}`,
            avatar_url: ``,
        }
    })
}

describe(`Tests Suggestions component`, () => {

    it(`it renders`, () => {
        render(<Suggestions data={[]} />);
    });
    
    it(`it renders 'No Suggestions' when suggestion list is empty`, () => {
        const { getByText, queryByRole } = render(<Suggestions data={[]} />);
        expect(queryByRole(`list`)).not.toBeInTheDocument();
        expect(getByText(/No Suggestions/i)).toBeInTheDocument();
    });
    
    it(`it renders Suggestion List when suggestion list is not empty`, () => {
        const data = createMockSuggestionData(5);
        const onSelectItemCallbackFn = jest.fn();
        const {
            queryByText,
            getByRole,
            queryAllByRole
        } = render(<Suggestions data={data} onSelectItem={onSelectItemCallbackFn}/>);
        expect(getByRole(`list`)).toBeInTheDocument();
        expect((queryAllByRole(`listitem`) as HTMLLIElement[])).toHaveLength(data.length);
        expect(queryByText(/No Suggestions/i)).not.toBeInTheDocument();

        ((queryAllByRole(`listitem`) as HTMLLIElement[])).forEach((listElement, index) => {
            fireEvent.click(listElement);
            expect(onSelectItemCallbackFn).toBeCalledWith(data[index]);
        })
    });
});
