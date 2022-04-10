import React from 'react';
import { Repository } from '../../../store';
import { DateUtils } from '../../../utils';
import { Flex } from '../../atoms';

type Props = {
    repository: Repository
}

export const RepositoryListItem: React.FC<Props> = ({ repository }) => {
    return (
        <Flex direction='column' className='repository__list-item'>
            <h4 className='repository__name'>{repository?.full_name}</h4>
            <p className='repository__description'>
                {repository?.description}
            </p>
            <Flex direction='row'>
                <span>Language</span>
                <label>{repository?.language}</label>
            </Flex>
            <Flex>
                <Flex direction='column'>
                    <span>Created At</span>
                    <label>{DateUtils.format(new Date(repository?.created_at))}</label>
                </Flex>
                <Flex direction='column'>
                    <span>Last Updated At</span>
                    <label>{DateUtils.format(new Date(repository?.updated_at))}</label>
                </Flex>
            </Flex>
            <Flex className='insights'>
                <Flex direction='column'>
                    <span>Watchers</span>
                    <label>{repository?.watchers}</label>
                </Flex>
                <Flex direction='column'>
                    <span>Forks</span>
                    <label>{repository?.forks}</label>
                </Flex>
            </Flex>
        </Flex>
    );
};
