import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TextInput } from './index';

describe(`Tests TextInput component`, () => {

    it(`TextInput component renders`, () => {
        let onChangeCallbackFn = jest.fn();
        render(<TextInput
                label={'Test'}
                value=""
                onChange={onChangeCallbackFn} />);
    });

    it(`Component renders input field with value`, () => {
        let onChangeCallbackFn = jest.fn();
        let inputValue = `Test`;
        let { getByTestId } = render(
            <TextInput
                label={'Test'}
                value={inputValue}
                onChange={onChangeCallbackFn} />
        );
        let textInputHtmlElement =  getByTestId(`text--input`);
        expect((textInputHtmlElement as HTMLInputElement).value).toEqual(inputValue);

        // assert input value change event
        inputValue = `abc`;
        fireEvent.change(textInputHtmlElement, { target: { value: inputValue }});
        expect(onChangeCallbackFn).toHaveBeenCalled();
    });
});
