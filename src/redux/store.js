import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from './authClice';
import {favoriteReducer} from './favoriteClice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        favorite: favoriteReducer,
    },
   
})

