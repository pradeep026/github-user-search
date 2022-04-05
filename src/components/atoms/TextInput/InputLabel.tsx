import React from 'react';

type Props = {
    /**
     * Label text to display for the TextInput
     */
    label: string;

    /**
     * name prop to handle the htmlFor attribute for the TextInput
     */
    name?: string
};

export const InputLabel: React.FC<Props> = ({ label, name }) => {
    return (
        <label
            htmlFor={name}
            aria-label={label}
            data-testid={'textinput--label'}>
            {label}
        </label>
    );
};
