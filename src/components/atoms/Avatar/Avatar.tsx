import React from 'react';
import './style.scss';

type AvatarSize =
    | `small`
    | `medium`
    | `large`

type Props = {
    /**
     * Avatar url to load in img tag
     */
    url?: string;

    /**
     * alt - content to be used with atl attribute
     */
    alt?: string;

    /**
     * Size of the avatar image - ex. small | medium | large
     */
    size?: AvatarSize
}

export const Avatar: React.FC<Props> = ({ url, alt, size }) => {
    const getClassName = (size?: AvatarSize) => {
        return size === `large` ?
        `large` : size === `medium` ?
            `medium` : `small`;
    };

    return (
        <div className='avatar__component'>
            <img
                src={url}
                alt={alt}
                className={getClassName(size)}
                role={'img'} />
        </div>
    );
};
