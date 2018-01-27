import React from 'react';
import css from './styles/styles.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import CheckboxComp from './CheckboxComp';
import CheckboxCounties from './CheckboxCounties';
import _ from 'lodash';

@graphql(gql`
{
  trainingCategories {
    id
    trainSkillName
  }
  counties {
    id
    countyName
  }
}
`
 )

class SearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      array: [],
      wantedSkill: [],
      arrayCounties: [],
      wandetCounties: [],
      modal: 'none',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.trainingCategories != undefined) {
      this.setState({array: nextProps.data.trainingCategories})
    }
    if(nextProps.data.counties != undefined) {
      this.setState({arrayCounties: nextProps.data.counties})
    }
  }

  handleSkillArr = (gotSkill) => {
    this.props.addToSkillArr(gotSkill)
  } 
  
  openModal() {
    this.setState({
      modal: this.state.modal == 'none' ? 'block' : 'none'
    })
  }
  openModalOpstina() {
    this.setState({
      modalOpstina: this.state.modalOpstina == 'none' ? 'block' : 'none'
    })
  }
  render() {
    console.log('ARAADASJD', this.props)
    let category = this.state.array.map((item, key) => {
      return (
        <div 
         key={key}>
        <CheckboxComp
          updateClick={this.listenClick}
          updateState={this.handleSkillArr}
          catName={item.trainSkillName}
          catId={item.id}
          stefan={this.state.click}
        />
        </div>
      )
    })
    let opstine = '';
    return(
      <div className={css.searchBoxWrapper}>
        <div className={css.searchBox}>
            <div className={css.categorie}>
              <div 
                onClick={() => this.openModal()}
                className={css.categorieButton}
              >
                Izaberite oblast
              </div>
              <div
                style={{
                  display:`${this.state.modal}`
                }}  
                className={css.categorieModal}
              >
                <div className={css.categorieModalWrapper}>
                    {category}
                </div>
              </div>
            </div>
            <div className={css.sertifikat}>
              <div className={css.sertifikatBox1}>
               <p> SERTIFIKOVANI TRENERI </p>
              </div>
              <div className={css.sertifikatBox2}>
                <div>
                  <label>Da</label><br />
                  <input 
                    className={css.radio} 
                    type="radio" 
                    name="cert" 
                    checked={this.props.certifiedField}
                    onChange={(val) => this.props.certifiedFunc(true)}  />
                </div>
                <div>
                  <label>Ne</label><br />
                  <input 
                    className={css.radio} 
                    type="radio" 
                    name="cert"
                    onChange={(val) => this.props.certifiedFunc(false)}
                    checked={!this.props.certifiedField} />
                </div>
              </div>
            </div>
            <div className={css.opstina}>
              <div
                onClick={() => this.openModalOpstina()}
                className={css.categorieButton}>
                Izaberite opstinu
              </div>
            </div>
            <div  className={css.sertifikat}>
              <div className={css.sertifikatBox1}>
                <p>TRENERI</p>
              </div>
              <div  className={css.sertifikatBox2}>
                <div>
                  <label>Grupni</label><br/>
                  <input 
                    className={css.radio}
                    type="radio"
                    name="coache"
                    checked={this.props.groupTraining}
                    onChange={(val) => this.props.groupTrainingFunc(true)} />
                </div>
                <div>
                  <label>Personalni</label><br/>
                  <input 
                    className={css.radio}
                    type="radio"
                    name="coache"
                    checked={!this.props.groupTraining}
                    onChange={(val) => this.props.groupTrainingFunc(false)} />
                </div>
              </div>
            </div>
            <div className={css.cena}>
              <label>Cena</label><br/>
              <input type="text" onChange={(val) => this.props.priceFromFunc(val.target.value)} />
              <input type="text" onChange={(val) => this.props.priceToFunc(val.target.value)} />
              <input type="button"/>
            </div> 
        </div>
      </div>
    )
  }
}
export default SearchBox;
