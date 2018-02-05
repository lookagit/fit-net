import React from 'react';
import css from '../styles/styles.scss';


class Countie extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className={css.opstina}>
            <div
              onClick={() => this.props.openModal()}
              className={css.categorieButton}>
              <div 
                className={css.countiesAlert}
                style={{display:`${this.props.countiesAlert}`}}>
                  Izaberite opstinu
              </div>
              <h3 style={{color: '#a9a9a9', fontWeight: 'bold'}}>Izaberite opstinu...</h3>
            </div>
          </div>
        );
    }
}

export default Countie;