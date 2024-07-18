import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './welcome.module.css';

 const Welcome = () => {
  return (
    <div className={styles.wrap}>
        <h1 className={styles.title}>Unlock your potential with the best <span>language</span>  tutors</h1>
        <p className={styles.text}>
           Embark on an Exciting Language Journey with Expert Language 
           Tutors: Elevate your language proficiency to new heights by 
          connecting with highly qualified and experienced tutors.
        </p>
        <div className={styles.started}>
            <NavLink className={styles.link} to="/teachers">Get started</NavLink>
        </div>
    </div>
  )
}

export default Welcome
