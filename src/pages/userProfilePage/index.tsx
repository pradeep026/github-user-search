import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex } from '../../components/atoms';
import { GithubRepositories } from '../../components/organisms/GithubRepositories';
import { GithubUserProfile } from '../../components/organisms/GithubUserProfile';
import { Repository, RootState, useAppDispatch, useAppSelector } from '../../store';
import { fetchRepositoriesByLoginId, fetchUserProfileByLoginId } from '../../store/slices/userProfile';
import './style.scss';

export const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useAppDispatch();
    const githubUser = useAppSelector((state: RootState) => state?.user);

    useEffect(() => {
        console.log(`----- params.id ${params.id}`);
        dispatch(fetchUserProfileByLoginId(params.id));
        dispatch(fetchRepositoriesByLoginId(params.id));
    }, []);

    const __goToRepositoryDetail = useCallback(
        (selectedItem: Repository) => {
            const routePath = `/users/${params.id}/repo/${selectedItem.name}`;
            const state = {
                defaultBranch: selectedItem.default_branch,
            };
            navigate(routePath, { state });
        },
    []);

    return (
        <Flex direction={'column'} className='user__profile-page'>
            <div className='profile__content'>
                <GithubUserProfile
                    userProfile={githubUser.profile} />
            </div>
            <div className='repositories__list'>
                <GithubRepositories
                    repositories={githubUser.listOfGitRepositories}
                    goToRepositoryDetail={__goToRepositoryDetail}/>
            </div>
        </Flex>
    );
};
