import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as shema from '../../schemas/schema';
import{ createUserWithEmailAndPassword} from 'firebase/auth'
import { setUser } from '../../redux/authClice';
import { BiHide } from "react-icons/bi";
import Button from 'components/Button/Button';
import styles from '../ModalLogIn/ModalLogIn.module.css'
import {auth} from '../../firebase/firebase'
import { toast } from 'react-toastify';


 const ModalRegistration = (onClose) => {
  const [visible, setVisible] = useState(false);
 
  const dispatch = useDispatch();

  const submit = async (evt) => {
    const email = evt.email;
    const password = evt.password;

    const formData = {
          name: evt.name,
          email: evt.email,
          password: evt.password,
        };
  
        const isValid = await shema.schemaRegistr.isValid(formData);            

          if (!isValid) {
            return;
           }

           createUserWithEmailAndPassword(auth,  email, password )
               .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                  email: user.email,
                  userId: user.uid,
                  token: user.accessToken,
                }))
                toast.success('Congratulations! You have successfully registered!');
               })
               .catch(() => toast.error('Invalid user!'))
              // .catch(() => alert('Invalid user!'))
               ;
                   
    reset();
  }

  const {register, handleSubmit, reset, formState:{errors, isValid}  } = useForm({
    initialValues: {
             name: '',
             email: '',
             password: '',
          },
    mode: "onBlur",
    resolver:yupResolver(shema.schemaRegistr)
  })
  return (
    <div>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.text}>Thank you for your interest in our platform! In order to<br/> 
        register, we need some information. Please provide us with<br/>
         the following information</p>
      <form className={styles.form} onSubmit={handleSubmit(submit)} autoComplete="off">
          <label className={styles.label}>
            <input className={styles.input}
            {...register('name') }
              name="name"
              placeholder= 'Name'
              type="text"
            />
             {errors?.name && (<span className={styles.span}>{errors?.name?.message || 'Errors!'}</span>)}
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
             <div className={styles.passInputWrap}>
                <input className={styles.input}
                  {...register('password') }
                  name="password"
                  placeholder= 'Password'
                  type={visible ? 'text' : 'password'}
                />
                 {errors?.password && (<span className={styles.span}>{errors?.password?.message || 'Errors!'}</span> )}
                <button className={styles.btnHide} type="button" onClick={() => {setVisible(!visible);}}>
                    <BiHide size={20}/>
                </button>
              </div>     
           </label>

           <Button type='submit' disabled={!isValid}>Sign Up</Button>
          
      </form>
    </div>
    
    
  )
}



export default ModalRegistration
