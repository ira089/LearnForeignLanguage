import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoBookOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaStar, FaHeart } from "react-icons/fa6";
import{selectFavorite} from '../../redux/favoriteSelectors'
import MoreTeacherItem from 'components/MoreTeacherItem/MoreTeacherItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ModalBook from 'components/ModalBook/ModalBook';
import {useAuth} from '../../redux/authSelectors';
import {addFavorite, removeFavorite, setFavorites} from '../../redux/favoriteClice';
import { toast } from 'react-toastify';
import styles from './teacherItem.module.css';
import {loadFavorites} from '../../firebase/apiDB';
import { addFavoriteDataBase, removeFavoriteDataBase } from '../../firebase/apiDB';


 const TeacherItem = ({item, isVariant}) => {
   
    const {isAuth, userId }= useAuth()
    const {variant} = isVariant;

    const{avatar_url, name, surname, languages, levels, rating, id,
        price_per_hour, lessons_done, lesson_info, conditions} = item;

        const dispatch = useDispatch();
        const favorites = useSelector(selectFavorite);  
        const isFavorite = favorites[id];  
        

        const [favoriteItems, setFavoriteItems] = useState([]);
        const [togleBtnColor, setTogleBtnColor] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    
                    const favorites = await loadFavorites(userId);
                    dispatch(setFavorites(favorites));
                    setFavoriteItems(favorites);
                  } catch (error) {
                  }}
              
            fetchData();
          }, [dispatch, userId]);

    const isBtnColor = Array.isArray(favoriteItems) ? favoriteItems.includes(id) : false;
        
    const handleClickFavorite = async(itemId) =>  {
      
        if(!isAuth) {
            toast.warning('This functionality is available only to authorized users!');
            return
        }
        
        if (isFavorite) {
            await removeFavoriteDataBase(userId, itemId); 
            dispatch(removeFavorite(itemId));
            setTogleBtnColor(false);
           
          } else {
            await addFavoriteDataBase(userId, itemId); 
            dispatch(addFavorite(itemId));
            setTogleBtnColor(true);
            
          }
        }

    const [activeBtn, setActiveBtn] = useState(false);
    const handleTabClick = () => {
          setActiveBtn(true);
        };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };

return (
<>
    <li key={id} id={id} className={styles.wrapItem}>
    <div className={styles.wrapAvatar}>
            <img className={styles.avatar} alt={name} src={avatar_url}/>
        </div>

        <div className={styles.wrapCart}>
            <div className={styles.wrapTitls}>
                <div className={styles.nameLanguages}>
                    <span className={styles.span}>Languages</span>
                    <h3 className={styles.name}>{`${name} ${surname}`}</h3>
                </div>
                <ul className={styles.wrapDetails}>
                    <li className={styles.listItem}>
                        <IoBookOutline size={16}/>Lessons online
                    </li>
                    <li className={styles.listItem}>
                        Lessons done:{lessons_done}
                    </li>
                    <li className={styles.listItem}>
                        <FaStar color='#ffc531'size={16}/>
                        Rating:{rating}
                    </li>
                    <li className={styles.listItem}>
                        Price/1hour:<span>{price_per_hour}$</span>
                    </li>
                </ul>
                <div>
                    {variant && 
                    <button className={styles.btnHeart} type='submit'
                     onClick={() => handleClickFavorite(item.id)} >
                    {isBtnColor || togleBtnColor ?  <FaHeart size={24} color=' #f4c550'/> :  <FaRegHeart size={24}/>}
                    </button> }
                </div>
            </div>
            <div className={styles.text} >
                <p className={styles.textP}><span >Speaks:</span><span className={styles.speaks}>{languages.join(', ')}</span></p>
                <p className={styles.textP}><span >Lesson Info:</span>{lesson_info} </p>
                <p className={styles.textP}><span >Conditions:</span>{conditions}</p>
            </div>
            {activeBtn ? 
            <MoreTeacherItem item={item}/> : 
            <button type='button' className={styles.btnRead} onClick={handleTabClick}>Read more</button>}
           
            <ul className={styles.listLevel}>
                {levels.map(level => (
                <li className={styles.itemLevel}>
                    {level}
                </li>))}
            </ul>
            {activeBtn &&
             <div className={styles.btnLesson}>
                <Button  type='button' onClick={openModal}>Book trial lesson</Button>
            </div>}
        </div>
    </li>
    <Modal isOpen={isModalOpen} onClose={closeModal}  height={972}>
        <ModalBook onClose={closeModal} item={item}/>
    </Modal>
</>
    
  )
}

export default TeacherItem
