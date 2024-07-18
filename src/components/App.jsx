import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import React from 'react';
import HomePage from '../Pages/HomePage/HomePage';
import  Layout  from '../Pages/Layout/Layout';
// import TeachersPage from 'Pages/TeachersPage/TeachersPage';
// import FavoritesPage from 'Pages/FavoritesPage/FavoritesPage';

const TeachersPage = lazy(() => import('../Pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() => import('../Pages/FavoritesPage/FavoritesPage'))

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} >
          </Route>
          <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<HomePage />}/>
      </Route>
    </Routes>
  );
};

export default App;