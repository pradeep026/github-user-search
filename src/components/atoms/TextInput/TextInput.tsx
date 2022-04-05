import React from 'react';
import { InputLabel } from './InputLabel';

import './style.scss';

type NativeInputProps = React.ComponentPropsWithRef<'input'>;

interface Props extends NativeInputProps {
    /**
     * Label or Text to Display on Button
     */
    label?: string;

    /**
     * custom style to override the input style
     */
    customStyle?: string;
}

export const TextInput: React.FC<Props> = ({ label, value, onChange, customStyle, name, placeholder, ...rest }) => {
    return (
        <div className='text__input-component' aria-placeholder={placeholder}>
            { label && <InputLabel name={name} label={label} /> }
            <input
                {...rest}
                type={'type'}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={ customStyle ? customStyle : ``}
                data-testid="text--input" />
        </div>
    );
};
