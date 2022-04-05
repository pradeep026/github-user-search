import React, { useEffect, useState } from 'react';
import { Search } from '../../molecules/Search';
import { Suggestions } from '../../molecules/Suggestions';
import { useDebounce } from '../../../hooks';


export const GithubUserSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>(``);
    const debounceSearchQuery = useDebounce(searchQuery, 1000);

    useEffect(() => {
        console.log(`Search query with debounce --- `, debounceSearchQuery);
        // Dispatch action to fetch api call from here
    }, [debounceSearchQuery]);

    const __onSearchValueChange = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <div className='github__user-search'>
            <Search placeholder='Search a github User' onValueChange={__onSearchValueChange}/>
            <Suggestions data={[]}/>
        </div>
    );
};
