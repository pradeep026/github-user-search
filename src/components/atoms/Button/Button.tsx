import React from 'react';
import './style.scss';

type NativeButtonProps = React.ComponentPropsWithRef<'button'>;

interface Props extends NativeButtonProps {
    /**
     * Label or Text to Display on Button
     */
    label: string;
};

export const Button: React.FC<Props> = React.memo(({ label, type, onClick, disabled, ...rest }) => {
    return (
        <button
            {...rest}
            type={type}
            aria-label={label}
            className={`button__component
                ${disabled ? `button__disabled` : ``}`}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    );
});
