import React, { useEffect, useState } from 'react';
import { ApiUrls, Network } from '../../../api';
import { marked } from 'marked';
import './style.scss';

interface ComponentProps {
    /**
     * github user's login id
     */
    loginid: string
    /**
     * Repository name
     */
    repository: string;
    /**
     * SHA - Commit has value of readme file
     */
    sha: string
}
export const ReadMeContent: React.FC<ComponentProps> = ({ loginid, repository, sha }) => {
    const [content, setContent] = useState(``);

    useEffect(() => {
        if (sha && repository && loginid) {
            const options = [
                { key: `loginid`, value: loginid },
                { key: `repository`, value: repository },
                { key: `sha`, value: sha },
            ];
            const url = Network.buildUrlWithPathParams(ApiUrls.Users.ReadMeFileBlob, options);
            new Network().makeGetRequest<string, { content: string }>({
                url,
            }).then(( { content }) => {
                const decodedContent = atob(content);
                const markdownContent = marked(decodedContent);
                return setContent(markdownContent);
            }).catch((error) => {
                setContent((error as unknown as Error)?.message);
            });
        } else {
            setContent(`Unable to load README.md file`);
        }
    }, [loginid, repository, sha]);

    return (
        <div className='readme__content'>
            <article dangerouslySetInnerHTML={{__html: content}}></article>
        </div>
    );
};
