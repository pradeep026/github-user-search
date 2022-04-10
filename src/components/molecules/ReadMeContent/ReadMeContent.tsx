import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Network } from '../../../api';
import './style.scss';

interface ComponentProps {
    /**
     * README.md content url
     */
    contentUrl: string;
}
export const ReadMeContent: React.FC<ComponentProps> = ({ contentUrl }) => {
    const [content, setContent] = useState(``);

    useEffect(() => {
        new Network().makeGetRequest<string, { content: string }>({
            url: contentUrl,
        }).then(( { content }) => {
            return setContent(atob(content));
        });
    }, [contentUrl]);

    return (
        <div className='readme__content'>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    );
};
