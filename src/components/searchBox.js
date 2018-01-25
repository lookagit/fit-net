import React from 'react';
import css from './styles/styles.scss';

class SearchBox extends React.Component {
  render() {
    return(
      <div className={css.searchBoxWrapper}>
        <div className={css.searchBox}>
          <form>
            <div className={css.kategorija}>
              <label>Kategorija</label><br/>
              <input ref="oblast" placeholder="Izaberite oblast..." type="text"/>
            </div>
            <div className={css.sertifikat}>
              <label>WHOOOPS</label><br/>
              <input className={css.radio} type="radio" name="cert"/>
              <label>dsada</label><br/>
              <input className={css.radio} type="radio" name="cert"/>
            </div>
            <div className={css.opstina}>
              <label>dsada</label><br/>
              <input type="text"/>
            </div>
            <div className={css.treneri}>
              <label>dsada</label><br/>
              <input className={css.radio} type="radio" name="coache"/>
              <label>dsada</label><br/>
              <input className={css.radio} type="radio" name="coache"/>
            </div>
            <div className={css.cena}>
              <label>dsada</label><br/>
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
