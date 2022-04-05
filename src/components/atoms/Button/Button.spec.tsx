import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Button } from './index';

describe(`Tests Button component`, () => {

    it(`it renders`, () => {
        render(<Button label='Button' />);
    });

    it(`Button component renders with label`, () => {
        const onClickCallbackFn = jest.fn();
        const { getByText } = render(<Button label='My Button' onClick={onClickCallbackFn} />);
        const buttonHtmlElement = getByText(/My Button/i);
        expect(buttonHtmlElement).toBeInTheDocument();
        expect(buttonHtmlElement).toBeEnabled();
        fireEvent.click(buttonHtmlElement);
        // Assert onClick callback fn should be called
        expect(onClickCallbackFn).toHaveBeenCalled();
    });

    it(`Button component when it is disabled`, () => {
        const onClickCallbackFn = jest.fn();
        const { getByText } = render(
            <Button
                label='My Button'
                disabled={true}
                onClick={onClickCallbackFn} />
        );
        const buttonHtmlElement = getByText(/My Button/i);
        expect(buttonHtmlElement).toBeDisabled();
        expect(buttonHtmlElement).toHaveClass(`button__disabled`);
        fireEvent.click(buttonHtmlElement);
        // Assert onClick callback fn should not be called
        expect(onClickCallbackFn).not.toHaveBeenCalled();
    });
});
