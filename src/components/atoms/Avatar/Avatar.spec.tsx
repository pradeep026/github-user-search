import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from './index';

describe(`Tests Button component`, () => {

    it(`it renders`, () => {
        const altText = `User profile image`
        const { getByAltText } =render(<Avatar url='' alt={altText}/>);
        expect(getByAltText(altText)).toBeInTheDocument();
    });
    it(`Assert avatar size - small`, () => {
        const altText = `User profile image`
        let { getByAltText } = render(
            <Avatar url={`test-img.png`} alt={altText} />
        );
        expect(getByAltText(altText)).toHaveClass(`small`);
    });
    it(`Assert avatar size - medium`, () => {
        const altText = `User profile image`
        let { getByAltText } = render(
            <Avatar url={`test-img.png`} alt={altText} size={`medium`} />
        );
        expect(getByAltText(altText)).toHaveClass(`medium`);
    });
    it(`Assert avatar size - large`, () => {
        const altText = `User profile image`
        let { getByAltText } = render(
            <Avatar url={`test-img.png`} alt={altText} size={`large`} />
        );
        expect(getByAltText(altText)).toHaveClass(`large`);
    });
});
