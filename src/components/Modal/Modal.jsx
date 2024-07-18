import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { RxCross2 } from "react-icons/rx";

    const Modal = ({ isOpen, onClose, children, width, height  }) => { 
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleCloseKeyPress = event => {
      if (event.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleCloseKeyPress);

    return () => document.removeEventListener('keydown', handleCloseKeyPress);
  }, [onClose]);

  if (!isOpen) return null;
  
  return createPortal(
    <div> 
      <div className={styles.modalContent} width={width}  height={height}>
           <button className={styles.btnClose} aria-label="Close modal" type='button'onClick={onClose}>
              <RxCross2 size={32}/>

            </button>
            {children}
      </div>
      <div className={styles.modal} onClick={onClose}></div>
    </div>,
    modalRoot
  );
};

export default Modal;