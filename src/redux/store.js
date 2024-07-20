import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from './authClice';
import {favoriteReducer} from './favoriteClice';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';


export const store = configureStore({
    reducer: {
        user: userReducer,
        favorite: favoriteReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        });
      },
   
})
export const persistor = persistStore(store);
