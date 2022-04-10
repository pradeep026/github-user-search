import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Search } from './index';

describe(`Tests Search component`, () => {

    it(`it renders`, () => {
        render(<Search />);
    });

    it(`Search renders with placeholder text`, () => {
        const placeholderText = `Search github user`;
        const { getByPlaceholderText }= render(
            <Search
                name={`search`}
                placeholder={placeholderText}/>
        );
        expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });
    
    it(`Assert search input change invokes onChange callback fn`, () => {
        const placeholderText = `Search github user`;
        const onChangeCallbackFn = jest.fn();
        const { getByPlaceholderText }= render(
            <Search
                name={`search`}
                onValueChange={onChangeCallbackFn}
                placeholder={placeholderText}/>
        );
        const searchInputHtmlElement = getByPlaceholderText(placeholderText);
        let inputValue = `abc`;
        fireEvent.change(searchInputHtmlElement, { target: { value: inputValue }});
        expect(onChangeCallbackFn).toHaveBeenLastCalledWith(inputValue);
    });
});
