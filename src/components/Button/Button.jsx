import React from 'react';
import styles from './button.module.css';

 const Button = ({ type = 'submit', children, onClick}) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick}> 
      {children}
    </button>
  );
};
export default Button