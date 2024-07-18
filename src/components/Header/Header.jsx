import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import {useAuth} from '../../redux/authSelectors';
import AuthNav from 'components/AuthNav/AuthNav';
import UserMenu from 'components/UserMenu/UserMenu';

const Header = () => {
  const {isAuth }= useAuth()

  return (
    
    <section className={styles.header}>
      <div className={styles.logo}>
          <p className={styles.circle}></p>           
          <p> LearnLingo</p>
      </div>

      <div className={styles.navigation}>
            <NavLink className={styles.linkNavigation} to="/">Home</NavLink>
            <NavLink className={styles.linkNavigation} to="/teachers">Teachers</NavLink>
            {isAuth && <NavLink className={styles.linkNavigation} to="/favorites">Favorites</NavLink>}
      </div>

      {isAuth ? <UserMenu/> : <AuthNav/>}
    </section>
  );
};
export default Header;



    

