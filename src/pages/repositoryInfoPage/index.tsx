import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Flex } from '../../components/atoms';
import { PaginatedList } from '../../components/molecules/PaginatedList';
import { ReadMeContent } from '../../components/molecules/ReadMeContent';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { fetchAllFileByRepoName } from '../../store/slices/githubRepository';
import './style.scss';

type LocationState = {
    defaultBranch: string;
};

export const RepositoryInfoPage: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const githubRepository = useAppSelector((state: RootState) => state?.githubRepository);
    const state = location.state as LocationState;

    useEffect(() => {
        dispatch(
            fetchAllFileByRepoName({
                loginId: params.id ?? ``,
                repoName: params?.name ?? ``,
                defaultBranch: state?.defaultBranch ?? ``,
            }),
        );
    }, []);

    return (
        <Flex direction={'column'} className='repo__tree-page'>
            <div className='repo__info'>
                <Flex>
                    Repositry Name: <span data-testid={`repo__name`}>{params?.name}</span>
                </Flex>
                <Flex>
                    Branch Name: <span data-testid={`branch__name`}>{state?.defaultBranch}</span>
                </Flex>
                <Flex>
                    Total Files:
                        <span data-testid={`repo__files_count`}>
                            {githubRepository?.githubRepoTree?.length}
                        </span>
                </Flex>
            </div>
            <Flex>
                <div className='flex__1'>
                    <PaginatedList
                        data={githubRepository?.githubRepoTree ?? []}
                        pageSize={50}
                        renderItem={(treeItem, index) => {
                            return (
                                <div key={index} className={`git__file-tree`}>
                                    {treeItem.path}
                                </div>
                            );
                        }}
                        onSelectItem={() => {

                        }} />
                </div>
                <div className='flex__1'>
                    <ReadMeContent
                        loginid={params?.id ?? ``}
                        repository={params?.name ?? ``}
                        sha={githubRepository?.readmeFile?.sha ?? ``} />
                </div>
            </Flex>
        </Flex>
    );
};
