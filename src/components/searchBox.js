import React from 'react';
import css from './styles/styles.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import CheckboxComp from './CheckboxComp';
import _ from 'lodash';

@graphql(gql`
{
  trainingCategories {
    id
    trainSkillName
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
      modal: 'none',
      modalWidth: '500px',
      click: 'auto'
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.trainingCategories != undefined) {
      this.setState({array: nextProps.data.trainingCategories})
    }
  }


  handleSkillArr = (gotSkill) => {
    this.props.addToArr(gotSkill)
    this.setState({ click: 'none' })
  } 
  
  openModal() {
    this.setState({
      modal: this.state.modal == 'none' ? 'block' : 'none'
    })
  }
  render() {
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
              <label>Da</label><br/>
              <input 
                className={css.radio} 
                type="radio" 
                name="cert" 
                checked={this.props.certifiedField}
                onChange={(val) => this.props.certifiedFunc(true)}  />
              <label>Ne</label><br/>
              <input 
                className={css.radio} 
                type="radio" 
                name="cert"
                onChange={(val) => this.props.certifiedFunc(false)}
                checked={!this.props.certifiedField} />
            </div>
            <div className={css.opstina}>
              <div>
                Izaberite opstinu
              </div>
            </div>
            <div className={css.treneri}>
              <label>Grupni</label><br/>
              <input className={css.radio} type="radio" name="coache"/>
              <label>Personalni</label><br/>
              <input className={css.radio} type="radio" name="coache"/>
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
