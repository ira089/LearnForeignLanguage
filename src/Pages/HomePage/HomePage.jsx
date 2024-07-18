import React from 'react'
import Welcome from 'components/Welcome/Welcome';
import Footer from 'components/Footer/Footer';
import DefaultImg from '../../assets/img/image3.png'
import styles from './homePage.module.css';

 const HomePage = () => {
  return (
    <>
       <section className={styles.wrap}>
          <Welcome/>
          <div className={styles.wrapImg}>
             <img className={styles.img} alt='teacher' src={DefaultImg} />
          </div>
        </section>
        <Footer/>
    </>
    
   
  )
}

export default HomePage
