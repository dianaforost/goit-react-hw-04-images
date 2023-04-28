import css from '../styles.module.css';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal-root')
export default function Modal({onClose, largeImageURL, tags}){

      useEffect(() => {
        function handleKeyDown(e) {
          if (e.key === 'Escape') {
            onClose();
          }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [onClose]);

    const onModalClose = event => {
        if(event.currentTarget === event.target){
            onClose()
        }
    }
    return createPortal(
        <div onClick={onModalClose} className={css.Overlay}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={tags} width={680}/>
            </div>
        </div>, modalRoot);
}

Modal.propTypes={
    largeImageURL: propTypes.string.isRequired,
    tags: propTypes.string
}