import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RepositoryInfoPage } from './pages/repositoryInfoPage';
import { UserProfilePage } from './pages/userProfilePage';
import { UserSearchPage } from './pages/userSearchPage';

export const RoutePaths = {
    IndexPage: `/`,
    UserProfile: `/users/:id`,
    RepositoryInfoPage: `/users/:id/repo/:name`,
};

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={RoutePaths.IndexPage} element={<UserSearchPage />} />
            <Route path={RoutePaths.UserProfile} element={<UserProfilePage />} />
            <Route path={RoutePaths.RepositoryInfoPage} element={<RepositoryInfoPage />} />
        </Routes>
    );
};

export default AppRouter;
