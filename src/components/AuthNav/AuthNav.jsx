import React, {useState} from 'react'
import { MdOutlineLogin } from "react-icons/md";
import { IconContext } from "react-icons";
import Modal from 'components/Modal/Modal';
import ModalLoginIn from 'components/ModalLogIn/ModalLoginIn';
import ModalRegistration from 'components/ModalRegistration/ModalRegistration';
import styles from './authNav.module.css';

 const AuthNav = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const openModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setModalType(null);
      setIsModalOpen(false);
    };
    
  return (
    <>
        <div className={styles.registration}>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                <button onClick={() => openModal('login')} className={styles.btnLogin} type='button'>
                    <MdOutlineLogin color='#8a8a89' size={20}/>
                    <span>Log in</span>
                </button>
            </IconContext.Provider>
 
            <button onClick={() => openModal('register')}className={styles.btnRegistration} type='button'>
               Registration
            </button>
        </div>

        {modalType === 'login' && (
           <Modal isOpen={isModalOpen} onClose={closeModal}  height={506}>
             <ModalLoginIn onClose={closeModal}/>
           </Modal>
        )}

        {modalType === 'register' && (
            <Modal isOpen={isModalOpen} onClose={closeModal}  height={600}>
              <ModalRegistration onClose={closeModal}/>
            </Modal>
        )}
    </>
    
  )
}

export default AuthNav ;
