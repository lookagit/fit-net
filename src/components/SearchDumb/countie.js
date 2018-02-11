import React from 'react';
import css from '../styles/styles.scss';

class Countie extends React.Component {
    constructor(props) {
        super(props);
    }
    inputHolder = () => {
      let name = this.props.nameInCounties;
      if(this.props.nameInCounties.length === 0){
        return 'Izaberite opstinu...';
      }else{
        return name;
      }
    }
    render() {
        return (
        <div className={css.categorie}>
          <div className={css.categorieTitle}>
            <p style={{marginTop: 0,color: '#fff', fontSize: '17px', fontWeight: 'bold', }}>OPŠTINA</p>
          </div>
          <div 
            onClick={() => this.props.openModal()}
            className={css.categorieButton}>
            <div 
              className={css.categoriesAlert}
              style={{display:`${this.props.countiesAlert}`}}>
              Izaberite opstinu
            </div>
            <h3 style={{color: '#a9a9a9', fontWeight: 'bold',}}>{this.inputHolder()}</h3>
          </div>
        </div>
        );
    }
}

export default Countie;