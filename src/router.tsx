import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserSearchPage } from './pages/userSearchPage';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={`/`} element={<UserSearchPage />} />
        </Routes>
    );
};

export default AppRouter;
