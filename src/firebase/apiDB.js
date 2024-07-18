import { ref, set,get, remove } from 'firebase/database';
import {setFavorites} from '../redux/favoriteClice';
import {db} from './firebase'

export const addFavoriteDataBase = async (userId, itemId) => {
    await set(ref(db, `favorites/${userId}/${itemId}`), true);
  };
  
  export const removeFavoriteDataBase = async(userId, itemId) => {
    await remove(ref(db, `favorites/${userId}/${itemId}`));
  };

  export const handleLogin = async (userId, dispatch) => {
    const favoritesRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(favoritesRef);
    if (snapshot.exists()) {
      const favorites = snapshot.val();
      dispatch(setFavorites(favorites));
    } else {
      dispatch(setFavorites({}));
    }
  };

  export const loadItems = async () => {
    const itemsRef = ref(db, 'teachers'); 
    const snapshot = await get(itemsRef);
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  };
   export const loadFavorites = async (userId) => {
     const favoritesRef = ref(db, `favorites/${userId}`);
    const snapshot = await get(favoritesRef);
    if (snapshot.exists()) {
       return Object.keys(snapshot.val());
    } else {
       return {};
     }}



    