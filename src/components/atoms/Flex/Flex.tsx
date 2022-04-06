import React, { ElementType } from 'react';
import './style.scss';

interface Props extends React.ComponentPropsWithoutRef<ElementType<any>> {
    /**
     * HTML tag to be used to wrap the flex style
     */
    tag?: keyof JSX.IntrinsicElements;

    /**
     * Flex direction - row or column
     * default value is row
     */
    direction?: 'row' | 'column';

    /**
     * Custom style to override flex alignments ex. justifyContent, alignItems ...
     */
    className?: string;
}

export const Flex: React.FC<Props> = ({ children, direction, className, tag: WrapperComponent = `div`, ...rest }) => {
    return (
        <WrapperComponent
            {...rest}
            className={`flex__component ${
                direction === 'column' ? 'column' : 'row'} ${
                className ? className : ``}`}>
            {children}
        </WrapperComponent>
    );
};
