import React from 'react';

import './style.scss';

type NativeInputProps = React.ComponentPropsWithRef<'input'>;

interface Props extends NativeInputProps {
    /**
     * Label or Text to Display on Button
     */
    label: string;
}

export const TextInput: React.FC<Props> = ({ label, value, onChange, ...rest }) => {
    return (
        <div className='text__input-component' aria-label={label}>
            <label>{label}</label>
            <input
                {...rest}
                type={'type'}
                value={value}
                onChange={onChange}
                data-testid="text--input" />
        </div>
    );
};
