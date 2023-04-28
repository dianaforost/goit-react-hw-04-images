import { Component } from 'react';
import css from '../styles.module.css';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root')
class Modal extends Component{
    componentDidMount(){
        window.addEventListener('keydown', this.keyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDown);
      }
    keyDown = e =>{
        if (e.key === "Escape") {
            this.props.onClose();
          }
    }
    onModalClose = event => {
        if(event.currentTarget === event.target){
            this.props.onClose()
        }
    }
    render(){
        const {largeImageURL, tags} = this.props;
        return createPortal(
        <div onClick={this.onModalClose} className={css.Overlay}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={tags} width={680}/>
            </div>
        </div>, modalRoot);
    }
}
Modal.propTypes={
    largeImageURL: propTypes.string.isRequired,
    tags: propTypes.string
}
export default Modal;
