import React from 'react';
import css from '../styles.module.css';
import { useState } from 'react';
import propTypes from 'prop-types';
 export default function Searchbar({onSubmitForm}){
  const [query, setQuery] = useState('');
  const onChange = (e)=>{
    const {value} = e.target;
    setQuery(value)
  }
  const onSubmit =(e) =>{
    e.preventDefault();
    onSubmitForm(query)
  }
  return <header className={css.Searchbar}>
  <form 
  onSubmit={onSubmit}
  className={css.SearchForm}>
    <button type="submit" className={css.SearchFormButton}>
      <span className={css.SearchFormButtonLabel}>Search</span>
    </button>

    <input
    name='query'
      className={css.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={onChange}
      value={query}
    />
  </form>
</header>
 }
Searchbar.propTypes = {
  onSubmit: propTypes.func,
  onChange: propTypes.func
}