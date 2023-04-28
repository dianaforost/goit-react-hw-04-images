import React, {Component} from 'react';
import css from './styles.module.css';
import fetchImages from './api/api'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class App extends Component {
  state = {
    query:'',
    images:[],
    currentPage: 1,
    onLoad: false,
    hasImages: false
  }
  handleSubmit = async query =>{
    if(query.trim() === ''){
      return Notify.failure('Please type smth')
    }
    else{
      try {
        this.setState({
          onLoad: true,
        })

        const { hits } = await fetchImages(query, 1);
        if (hits.length > 1) {
        this.setState({hasImages:true})
      }
        if (hits.length < 1) {
          this.setState({hasImages:false})
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
        this.setState({
          query: query,
          images: [...hits],
          currentPage: 1
        });
      } catch (error) {
        console.log("Smth wrong with App fetch", error);
      }finally {
        this.setState({
          onLoad: false,
        })
          }
    }
  }
  onLoadMore = async()  =>{
    const { query,currentPage} = this.state;
    try {
        this.setState({
          onLoad: true,
        })
      const { hits } = await fetchImages(query, currentPage + 1);
      if (hits.length > 0) {
        this.setState({hasImages:true})
      }
      if (hits.length === 0) {
        this.setState({hasImages:false})
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage:prevState.currentPage + 1,
      }));

    } catch (error) {
      console.log("Smth wrong with App fetch", error);

    }finally {
        this.setState({
          onLoad: false,
        })
          }
  }
  render(){
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.images.length < 1 &&(
          <div className={css.container}>
            <p className={css.Empty}>Empty gallery...</p>
          </div>
        )}
        {this.state.hasImages && <ImageGallery images={this.state.images} query={this.state.query}/>}
        {this.state.onLoad && <Loader />}
        {this.state.images.length > 0 && !this.state.onLoad && this.state.hasImages && <Button onClick={this.onLoadMore}/>}
      </div>
    );
  }
}