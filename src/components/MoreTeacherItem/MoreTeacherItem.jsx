import React from 'react'
import { FaStar} from "react-icons/fa6";
import styles from './moreTeacherItem.module.css'

 const MoreTeacherItem = ({item}) => {
    const{ reviews, experience} = item;
  return (
    <>
      <p> className={styles.text}{experience}</p>
      <ul className={styles.listReviews}>
           {reviews.map(review => (
            <li className={styles.itemLevel}>
                <div>
                    <p className={styles.nameReviews}>{review.reviewer_name}</p>
                    <div>
                        <FaStar color='#ffc531'size={16}/>
                        <span>{review.reviewer_rating}.0</span>
                    </div>
                </div>
                <p className={styles.comment}>{review.comment}</p>    
            </li>))}
      </ul>
    </>
    
  )
}

export default MoreTeacherItem
