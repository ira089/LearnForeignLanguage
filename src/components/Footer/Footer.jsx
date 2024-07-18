import React from 'react'
import styles from './footer.module.css';

 const Footer = () => {
  return (
    <section className={styles.wrap}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <h4 className={styles.amount}>32,000 +</h4>
          <p className={styles.text}>Experienced<br/>tutors</p>
        </li>
        <li className={styles.item}>
          <h4 className={styles.amount}>300,000 +</h4>
          <p className={styles.text}>5-star tutor<br/>reviews</p>
        </li>
        <li className={styles.item}>
           <h4 className={styles.amount}>120 +</h4>
           <p className={styles.text}>Subjects<br/>taught</p>
        </li>
        <li className={styles.item}>
          <h4 className={styles.amount}>200 +</h4>
          <p className={styles.text}>Tutor<br/>nationalities</p>
        </li>
      </ul>
    </section>
  )
}

export default Footer
