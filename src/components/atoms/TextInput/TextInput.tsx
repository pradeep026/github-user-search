import React from 'react';
import { assertIsFunction } from '../../../utils';
import { InputLabel } from './InputLabel';

import './style.scss';

type NativeInputProps = React.ComponentPropsWithRef<'input'>;

export interface TextInputProps extends NativeInputProps {
    /**
     * Label or Text to Display on Button
     */
    label?: string;

    /**
     * onValueChange - on change callback function with input value
     */
    onValueChange?: (value: string) => void

    /**
     * custom style to override the input style
     */
    customStyle?: string;
}

export const TextInput: React.FC<TextInputProps> =
    ({ label, value, onValueChange, customStyle, name, placeholder, ...rest }) => {
    const __onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        assertIsFunction(onValueChange) &&
            onValueChange(event.target.value);
    };

    return (
        <div className='text__input-component' aria-placeholder={placeholder}>
            { label && <InputLabel name={name} label={label} /> }
            <input
                {...rest}
                type={'type'}
                value={value}
                name={name}
                onChange={__onChange}
                placeholder={placeholder}
                className={ customStyle ? customStyle : ``}
                data-testid="text--input" />
        </div>
    );
};
