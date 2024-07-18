import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import React from 'react';
import  Layout  from '../Pages/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeachersPage = lazy(() => import('../Pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() => import('../Pages/FavoritesPage/FavoritesPage'))
const HomePage = lazy(() => import('../Pages/HomePage/HomePage'))

const App = () => {
  return (
    <>
       <Routes>
          <Route path="/" element={<Layout />}>
             <Route index element={<HomePage />} />
             <Route path="/teachers" element={<TeachersPage />} />
             <Route path="/favorites" element={<FavoritesPage />} />
             <Route path="*" element={<HomePage />}/>
          </Route>
       </Routes>
       <ToastContainer autoClose={3000} />
    </>
    
  );
};

export default App;