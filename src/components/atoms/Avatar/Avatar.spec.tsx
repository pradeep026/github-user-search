import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Avatar } from './index';

describe(`Tests Button component`, () => {

    it(`it renders`, () => {
        const altText = `User profile image`
        const { getByAltText } =render(<Avatar url='' alt={altText}/>);
        expect(getByAltText(altText)).toBeInTheDocument();
    });
});
