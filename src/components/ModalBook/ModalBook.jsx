import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as shema from '../../schemas/schema';
import Button from 'components/Button/Button';
import styles from './modalBook.module.css'

 const ModalBook = ({item, onClose}) => {
    const{avatar_url, name, surname, languages} = item;

    const submit = async (evt) => {
        // const fullName = evt.name;
        // const email = evt.email;
        // const phone = evt.phone;
    
        const formData = {
             fullName: evt.name,
              email: evt.email,
              phone: evt.phone,
            };
      
            const isValid = await shema.schemaBook.isValid(formData);            
    console.log(isValid)
              if (isValid) {
                return;
               }
        reset();
        onClose()
      }
    
      const {register, handleSubmit, reset, formState:{errors, isValid}  } = useForm({
        initialValues: {
                 fullName: '',
                 email: '',
                 phone: '',
              },
        mode: "onBlur",
        resolver:yupResolver(shema.schemaBook)
      })
     
  return (
    <div className={styles.wrap}>
        <h2 className={styles.title}>Book trial lesson</h2>
        <p className={styles.text}>Our experienced tutor will assess your current language level,
         discuss your learning goals, and tailor the lesson to your specific
          needs.
        </p>
        <div className={styles.wrapAvatar}>
            <img className={styles.avatar} alt={name} src={avatar_url}/>
            <div className={styles.nameLanguages}>
                    <span className={styles.spanTeacher}>Your teacher</span>
                    <h3 className={styles.name}>{`${name} ${surname}`}</h3>
            </div>
        </div>
        <h3 className={styles.titleLanguages}>What is your main reason for learning {`${languages[0]}`}?</h3>
        <form className={styles.form} onSubmit={handleSubmit(submit)} autoComplete="off">
            <div className={styles.wrapRadio}>
                <label className={styles.labelradio}>
                    <input className={styles.radio}
                     {...register('radio') }
                     name="radio" value="career"
                      type="radio" checked
                    />
                   Career and business
                </label>
                <label className={styles.labelradio}>
                     <input className={styles.radio}
                      {...register('radio') }
                      name="radio" value="kids"
                      type="radio" 
                    />
                    Lesson for kids
                </label>
                <label className={styles.labelradio}>
                    <input className={styles.radio}
                     {...register('radio') }
                     name="radio" value="living"
                     type="radio" 
                    />
                    Living abroad
                </label>
                <label className={styles.labelradio}>
                     <input className={styles.radio}
                       {...register('radio') }
                      name="radio" value="exams"
                      type="radio" 
                    />
                    Exams and coursework
                </label>
                <label className={styles.labelradio}>
                    <input className={styles.radio}
                       {...register('radio') }
                       name="radio" value="hobby"
                       type="radio" 
                    />
                    Culture, travel or hobby
                </label>
            </div>

            <div className={styles.wrapInput}>
                <label className={styles.label}>
                    <input className={styles.input}
                       {...register('fullName') }
                       name="fullName"
                       placeholder= 'Full Name'
                       type="text"
                    />
                    {errors?.fullName && (<span className={styles.span}>{errors?.fullName?.message || 'Errors!'}</span>)}
                </label>
        
                <label className={styles.label}>
                    <input className={styles.input}
                       {...register('email') }
                       name="email"
                       placeholder= 'Email'
                       type="email"
                    />
                     {errors?.email && (<span className={styles.span}>{errors?.email?.message || 'Errors!'}</span>)}
                </label>

                <label className={styles.label}>
                    <input className={styles.input}
                       {...register('phone') }
                       name="phone"
                       placeholder= 'Phone number'
                       type="phone"
                    />
                    {errors?.phone && (<span className={styles.span}>{errors?.phone?.message || 'Errors!'}</span>)}
                </label>
            </div>

            <Button type='submit' disabled={!isValid}>Book</Button>
        
        </form>
  </div>
  )
}

export default ModalBook
