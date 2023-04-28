import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import propTypes from 'prop-types';
export default function ImageGallery(images){
  return <ul className={css.ImageGallery} >
      {images.images.map(image =>(
        <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} tags={image.tags} largeImageURL={image.largeImageURL}/>
      ))}
  </ul>
}

ImageGallery.propTypes = {
  images: propTypes.array.isRequired
}