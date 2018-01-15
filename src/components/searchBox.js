import React from 'react';
import css from './styles/styles.scss';

class SearchBox extends React.Component {
  render() {
    return(
      <div className={css.searchBoxWrapper}>
        <div className={css.searchBox}>
          <form>
            <div className={css.inputWrapper}>
              <input type="text"/>
            </div>
            <div className={css.inputWrapper}>
              <input type="radio" name="cert"/>
              <input type="radio" name="cert"/>
            </div>
            <div className={css.inputWrapper}>
              <input type="text"/>
            </div>
            <div className={css.inputWrapper}>
              <input className={css.proba} type="radio" name="coache"/>
              <input type="radio" name="coache"/>
            </div>
            <div className={css.inputWrapper}>
              <input type="text"/>
              <input type="text"/>
              <input type="button"/>
            </div> 
          </form>
        </div>
      </div>
    )
  }
}
export default SearchBox;
