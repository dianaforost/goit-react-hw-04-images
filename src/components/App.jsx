import React from 'react';
import css from './styles.module.css';
import fetchImages from './api/api'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';
export function App(){
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onLoad, setOnLoad] = useState(false);
  const [hasImages, setHasImages] = useState(false);
  const onSubmitForm = async query =>{
    if(query.trim() === ''){
      return Notify.failure('Please type smth')
    }else{
      try {
        setOnLoad(true)

        const { hits } = await fetchImages(query, 1);
        if (hits.length > 1) {
        setHasImages(true)
      }
        if (hits.length < 1) {
          setHasImages(false)
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
      setQuery(query)
      setImages([...hits])
      setCurrentPage(1)
      } catch (error) {
        console.log("Smth wrong with App fetch", error);
      }finally {
        setOnLoad(false)
          }
    }
  }

  const onLoadMore = async() =>{
    try {
      setOnLoad(true)
      const { hits } = await fetchImages(query, currentPage + 1);
      if (hits.length > 0) {
        setHasImages(true)
      }
      if (hits.length === 0) {
        setHasImages(false)
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    setImages(prevState => [...prevState, ...hits]);
    setCurrentPage(prevState => prevState + 1)

    } catch (error) {
      console.log("Smth wrong with App fetch", error);

    }finally {
      setOnLoad(false)
          }
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmitForm={onSubmitForm} />
      {images.length < 1 &&(
        <div className={css.container}>
          <p className={css.Empty}>Empty gallery...</p>
        </div>
      )}
      {hasImages && <ImageGallery images={images}/>}
      {onLoad && <Loader />}
      {images.length > 0 && !onLoad && hasImages && <Button onClick={onLoadMore}/>}
    </div>
  );
}