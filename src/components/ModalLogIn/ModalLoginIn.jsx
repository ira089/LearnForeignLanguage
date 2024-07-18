import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import{ signInWithEmailAndPassword} from 'firebase/auth'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as shema from '../../schemas/schema';
import { setUser } from '../../redux/authClice';
import { BiHide } from "react-icons/bi";
import Button from 'components/Button/Button';
import styles from './ModalLogIn.module.css'
import {auth} from '../../firebase/firebase'

 const ModalLoginIn = (onClose) => {

  const [visible, setVisible] = useState(false);
 
  const dispatch = useDispatch();

  const submit = async (evt) => {
    const email = evt.email;
    const password = evt.password;

    const formData = {
          email: evt.email,
          password: evt.password,
        };
  
        const isValid = await shema.schemaLogin.isValid(formData);            

          if (!isValid) {
            return;
           }

  signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
                dispatch(setUser({
                  email: user.email,
                  userId: user.uid,
                  token: user.accessToken,
                }));
      })
      .catch(() => alert('Invalid user!'))  
    reset();
  }

  const {register, handleSubmit, reset, formState:{errors, isValid}  } = useForm({
    initialValues: {
             email: '',
             password: '',
          },
    mode: "onBlur",
    resolver:yupResolver(shema.schemaLogin)
  })

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.text}>Welcome back! Please enter your credentials to access your<br/>
         account and continue your search for an teacher.</p>
      <form className={styles.form} onSubmit={handleSubmit(submit)} autoComplete="off">
          
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

           <Button type='submit' disabled={!isValid}>Log In</Button>
          
      </form>
    </div>
  )
}

export default ModalLoginIn
