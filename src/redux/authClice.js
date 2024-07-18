import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const initialState = {
  name: null,
  email: null,
  token: null,
  userId: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setUser(state, {payload})  {
      state.name = payload.name;
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
    },
    removeUser(state) {
      state.name = null;
      state.email = null;
      state.token = null;
      state.userId = null;
    }
  }
});

const persistConfig = {
  key: 'authLS',
  storage,
  stateReconciler: hardSet,
};

export const userReducer = persistReducer(
  persistConfig,
  userSlice.reducer
);

export const{setUser, removeUser} = userSlice.actions;
