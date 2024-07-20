
import { useSelector, useDispatch } from 'react-redux';
import React, {useState, useEffect} from 'react'
import{selectFavorite} from '../../redux/favoriteSelectors'
import styles from '../TeachersList/teachersList.module.css';
import TeacherItem from 'components/TeacherItem/TeacherItem'
import Button from 'components/Button/Button';
import { setFavorites } from '../../redux/favoriteClice';
import {useAuth} from '../../redux/authSelectors';
import{auth} from '../../firebase/firebase'
import {handleLogin, loadItems, loadFavorites} from '../../firebase/apiDB';

 const FavoriteTeacherList = () => {
     const {userId }= useAuth();
     const dispatch = useDispatch();

     useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            handleLogin(user.uid, dispatch);
          }
        });
        return () => unsubscribe();
      }, [dispatch]);
   
    const favoriteTeacherId = useSelector(selectFavorite);
   
    const [allTeachers, setAllTeachers] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadItems();
                const teachers = Object.entries(data).map(([key, value]) => ({
                  id: key,
                  ...value,
                }));
                setAllTeachers(teachers);
                
                const favorites = await loadFavorites(userId);
                dispatch(setFavorites(favorites));
              } catch (error) {
              }}
          
        fetchData();
      }, [dispatch, userId]);

      useEffect(() => {
        setFavoriteItems(Array.isArray(allTeachers) && Array.isArray(favoriteTeacherId) ? allTeachers.filter(item => 
          favoriteTeacherId.includes(item.id)) : []) 
       
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [ favoriteTeacherId]) 

    const [allItemsLoaded, setAllItemsLoaded] = useState(false);
    const [paginatedItems, setPaginatedItems] = useState([]) 
    const [page, setPage] = useState(1)

    const itemsPerPage = 4;
   
    useEffect(() => {
        const allLoaded = favoriteItems.length <= page * itemsPerPage;
            if (allLoaded !== allItemsLoaded) {
              setAllItemsLoaded(allLoaded);
            }
        const newPaginatedItems = favoriteItems.slice(0, page * itemsPerPage);
            if (JSON.stringify(newPaginatedItems) !== JSON.stringify(paginatedItems)) {
              setPaginatedItems(newPaginatedItems);
            }
              
        }, [page, favoriteItems, allItemsLoaded, paginatedItems])
      
    const  loadMoreTeachers = () => {
          if (!allItemsLoaded) {
            setPage(page + 1)
          }
        }
   
    const isVariant = { variant: false};
    const elements = paginatedItems.map(item => (
      <TeacherItem
        key={item.id}
        item={item}
        isVariant={isVariant}
      />
    ));
  
    const isItems = Boolean(paginatedItems.length);
  
    return (
      <div className={styles.wraplist}>
          {isItems ? <ul >{elements}</ul> : <p>Sorry, you don't have any selected teachers.</p>}
          {!allItemsLoaded && 
            <div className={styles.bntLoad}>
               <Button type='button' onClick={loadMoreTeachers}>Load More</Button>
            </div>}
        
      </div>
    )
}

export default FavoriteTeacherList
