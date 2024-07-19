import React, { useEffect, useState, useRef} from 'react'
import styles from './teachersList.module.css';
import TeacherItem from 'components/TeacherItem/TeacherItem'
import Button from 'components/Button/Button';
import {  ref,  query, limitToFirst, startAfter,  orderByKey, get} from "firebase/database";
import {db} from '../../firebase/firebase'

 const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialLoad = useRef(true);

  const fetchTeachers = async (key = null) => {
    setLoading(true);
    let teachersQuery;
    if (key) {
      teachersQuery = query(ref(db, 'teachers'), orderByKey(), startAfter(key), limitToFirst(4));
    } else {
      teachersQuery = query(ref(db, 'teachers'), orderByKey(), limitToFirst(4));
    }

    const snapshot = await get(teachersQuery);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const teachersList = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      setTeachers((prevTeachers) => [...prevTeachers, ...teachersList]);
      setLastKey(teachersList.length ? teachersList[teachersList.length - 1].id : null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialLoad.current) {
      fetchTeachers();
      initialLoad.current = false; 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);
    
  const loadMoreTeachers = () => {
    if (lastKey) {
      fetchTeachers(lastKey);
    }
  }; 

  const isVariant = { variant: true};
  const elements = teachers.map(item => (
    <TeacherItem
      key={item.id}
      item={item}
      isVariant={isVariant}
    />
  ));

  const isItems = Boolean(teachers.length);

  return (
    <div className={styles.wraplist}>
      {loading && <p>Loading...</p>}
      {isItems && <ul >{elements}</ul>}
      {!loading && lastKey && 
      <div className={styles.bntLoad}>
         <Button type='button' onClick={loadMoreTeachers}>Load More</Button>
      </div>}
      
    </div>
  )
}

export default TeachersList


