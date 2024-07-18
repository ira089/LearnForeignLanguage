import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../redux/authSelectors';
import { removeUser } from '../../redux/authClice';
import { IconContext } from "react-icons";
import { MdOutlineLogout } from "react-icons/md";
import styles from '../AuthNav/authNav.module.css';

 const UserMenu = () => {
  const navigate = useNavigate();
    const {email }= useAuth();
    const dispatch = useDispatch();
  const handeleLogOut = () => {
    dispatch(removeUser());
    navigate('/')
  };
  return (
    <div className={styles.registration}>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                <button type="button" onClick={handeleLogOut} className={styles.btnLogin}>
                    <MdOutlineLogout color='#8a8a89' size={20}/>
                    <span>Logout</span>
                </button>
            </IconContext.Provider>
 
            <button className={styles.btnRegistration} type='button'>
            {email}
            </button>
    </div>
  )
}

export default UserMenu
