import React from 'react';

type Props = {

    /**
     * Avatar url to load in img tag
     */
    url?: string;

    /**
     * alt - content to be used with atl attribute
     */
    alt?: string;
}

export const Avatar: React.FC<Props> = ({ url, alt}) => {
    return (
        <div className='avatar__component'>
            <img src={url} alt={alt} role={'img'} />
        </div>
    );
};
