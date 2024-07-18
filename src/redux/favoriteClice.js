import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const favoriteClice = createSlice({
    name: 'favorite',
    initialState: {
        favoriteTeacher: [],
    },
    reducers: {
        addFavorite(state, {payload}) {
           
            state.favoriteTeacher[payload] = true;
        },
        removeFavorite(state, {payload}) {
            delete state.favoriteTeacher[payload];
        },
        setFavorites: (state, {payload}) => {
            state.favoriteTeacher = payload;
          },
    }
});

const persistConfig = {
    key: 'favoriteTeacher',
    storage,
    stateReconciler: hardSet,
  };
  
  export const favoriteReducer = persistReducer(
    persistConfig,
    favoriteClice.reducer
  );

  export const {addFavorite, setFavorites, removeFavorite} = favoriteClice.actions