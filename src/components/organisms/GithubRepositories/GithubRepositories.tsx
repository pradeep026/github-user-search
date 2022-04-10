import React from 'react';
import { Repository } from '../../../store';
import { Flex, SimpleList } from '../../atoms';
import { RepositoryListItem } from './RepositoryListItem';
import './style.scss';

type Props = {
    goToRepositoryDetail?: (selectedItem: Repository) => void;

    repositories: Repository[]
}


export const GithubRepositories: React.FC<Props> = ({ goToRepositoryDetail, repositories }) => {
    return (
        <Flex className='repository__list'>
            {
                <SimpleList
                    data={repositories}
                    renderItem={(item, index) => (
                        <RepositoryListItem key={index} repository={item} />
                    )}
                    onSelectItem={goToRepositoryDetail} />
            }
        </Flex>
    );
};
