import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TextInput } from './index';

describe(`Tests TextInput component`, () => {

    it(`it renders`, () => {
        let onChangeCallbackFn = jest.fn();
        const placeholderText = `Please enter a value`;
        const { getByPlaceholderText } = render(<TextInput
                label={'Test'}
                placeholder={placeholderText}
                onChange={onChangeCallbackFn} />);
        expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    it(`TextInput does not render label when is not passed as prop`, () => {
        const placeholderText = `Please enter a value`;
        const { queryByTestId } = render(<TextInput placeholder={placeholderText} />);
        expect(queryByTestId(`textinput--label`)).not.toBeInTheDocument();
    });

    it(`Assert customStyle prop`, () => {
        const placeholderText = `Please enter a value`;
        const { getByPlaceholderText } = render(
            <TextInput
                placeholder={placeholderText}
                customStyle={'custom__input'}/>
        );
        expect(getByPlaceholderText(placeholderText)).toHaveClass(`custom__input`);
    });

    it(`Assert TextInput value and change event`, () => {
        let onChangeCallbackFn = jest.fn();
        let inputValue = `Test`;
        let { getByLabelText, getByTestId } = render(
            <TextInput
                label={'Test'}
                name={`test`}
                value={inputValue}
                onChange={onChangeCallbackFn} />
        );
        let textInputHtmlElement = getByTestId(`text--input`);
        expect(getByLabelText(/Test/i)).toHaveAttribute(`for`, `test`);
        expect((textInputHtmlElement as HTMLInputElement).value).toEqual(inputValue);

        // assert input value change event
        inputValue = `abc`;
        fireEvent.change(textInputHtmlElement, { target: { value: inputValue }});
        expect(onChangeCallbackFn).toHaveBeenCalled();
    });
});
