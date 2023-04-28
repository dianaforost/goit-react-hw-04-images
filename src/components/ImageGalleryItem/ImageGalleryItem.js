import css from '../styles.module.css';
import React, { useState } from 'react';
import Modal from '../Modal/Modal'
import propTypes from 'prop-types';
export default function ImageGalleryItem({webformatURL, tags, largeImageURL}){
const [onOpenModal, setOnOpenModal] = useState(false)
const onModal = ()=>{
  setOnOpenModal(!onOpenModal)
}
return (
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItemImage}
      src={webformatURL}
      alt={tags}
      onClick={onModal}
    />
  {onOpenModal && <Modal  onClose={onModal} largeImageURL={largeImageURL} tag={tags}/>}
  </li>
);
}

ImageGalleryItem.propTypes ={
  webformatURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired
}