import React from 'react';
import css from '../styles/styles.scss';

class Categorie extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      }
  }
  inputHolder = () => {
    let name = this.props.nameInCategorie;
    if(this.props.nameInCategorie.length === 0){
      return 'Izaberite kategoriju...';
    }else{
      let withComma = name.join(', ');
      return withComma;
    }
  }
  render() {
    return (
      <div className={css.categorie}>
        <p style={{marginTop: 0,color: '#fff', fontSize: '17px', fontWeight: 'bold', }}>Kategorija</p>
          <div 
            onClick={() => this.props.openModal()}
            className={css.categorieButton}>
            <div 
              className={css.categoriesAlert}
              style={{display:`${this.props.categoriesAlert}`}}>
              Izaberite kategoriju
            </div>
            <h3 style={{color: '#a9a9a9', fontWeight: 'bold',}}>{this.inputHolder()}</h3>
          </div>
      </div>
    );
  }
}
export default Categorie;
