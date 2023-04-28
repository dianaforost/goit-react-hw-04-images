import css from '../styles.module.css';
import propTypes from 'prop-types';
export default function Button({onClick}){
    return <div className={css.container}>
        <button className={css.Button} onClick={onClick}>Load More</button>
    </div>
}
Button.propTypes ={
    onClick : propTypes.func.isRequired
}