import React from 'react';
import { TextInput } from '../../atoms';
import type { TextInputProps } from '../../atoms';
import { ReactComponent as SVGIconSearch } from '../../../assets/icons/icon__search.svg';
import './style.scss';

interface Props extends TextInputProps {
}

export const Search: React.FC<Props> = React.memo(({ ...rest }) => {
    return (
        <div className='search__component'>
            <div className='icon'>
                <SVGIconSearch width={32}/>
            </div>
            <TextInput
                {...rest}
                customStyle='custom__search-input'/>
        </div>
    );
});
