import React from 'react';
import css from './styles/styles.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import CheckboxComp from './CheckboxComp';
import CheckboxCounties from './CheckboxCounties';
import _ from 'lodash';
import Categorie from './SearchDumb/categorie';
import Sertifikat from './SearchDumb/sertifikat';
import Countie from './SearchDumb/countie';
import GroupTrening from './SearchDumb/groupTrening';
import Prices from './SearchDumb/prices';
import SearchClubs from './SearchDumb/searchClubs';
import ComingHome from './SearchDumb/comingHome';
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
  fisioCategories{
    id
    fisioSkillName
  }
}
`)

class SearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      arrayFizio: [],
      arrayCategories: [],
      arrayCounties: [],
      modalCategories: 'none',
      modalCounties: 'none',
      groupTraining: false,
      nameInCategorie: [],
      nameInCounties: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.trainingCategories != undefined) {
      this.setState({arrayCategories: nextProps.data.trainingCategories})
    }
    if(nextProps.data.counties != undefined) {
      this.setState({arrayCounties: nextProps.data.counties})
    }
    if(nextProps.data.fisioCategories != undefined) {
      this.setState({arrayFizio: nextProps.data.fisioCategories})
    }
  }

  handleSkillArr = (gotSkill, gotName) => {
      let {nameInCategorie} = this.state;
      if (nameInCategorie.includes(gotName)) {
        let a = this.state.nameInCategorie;
        let b = a.indexOf(nameInCategorie);
        a.splice(b, 1);
        this.setState({
          nameInCategorie: a
        })
      } else {
        this.setState({
          nameInCategorie: [...nameInCategorie, gotName],
        })
      }
    if(this.props.clubs) {
      this.props.selectCategories(parseInt(gotSkill));
    }else if(this.props.coaches){
      this.props.addToSkillArr(gotSkill);
    }else if(this.props.fizio){
      // OVO JE PRIVREMENO!! TREBA MASSAGETYPE
      this.props.fizioCategories(gotSkill);
    }
  }
  handleCountiesArr = (gotId, gotName) => {
    let {nameInCounties} = this.state;
    if (nameInCounties.includes(gotName)) {
      let a = this.state.nameInCounties;
      let b = a.indexOf(nameInCounties);
      a.splice(b, 1);
      this.setState({
        nameInCounties: a
      })
    } else {
      this.setState({
        nameInCounties: [gotName],
      })
    }
    if(this.props.clubs) {
      this.props.selectCounties(gotId);
    }else if(this.props.coaches){
      this.props.addToCountiesArr(gotId);
    }else if(this.props.fizio){
      this.props.fizioCounties(gotId);
    }
  }

  openModalCategories = () => {
    this.setState({
      modalCategories: this.state.modalCategories == 'none' ? 'block' : 'none'
    })
  }
  openModalCounties = () => {
    this.setState({
      modalCounties: this.state.modalCounties == 'none' ? 'block' : 'none'
    })
  }
  sendGroupTraining(){
    this.setState({
      groupTraining: !this.state.groupTraining
    })
  }
  stopPropagation(e){
    e.stopPropagation();
  }
  // sendParams = () => {
  //   this.props.getParams('poslato')
  // }
  render() {
    let fizio = this.state.arrayFizio.map((item, key) => {
      return (
        <CheckboxComp
        key={key}
        updateState={this.handleSkillArr}
        catName={item.fisioSkillName}
        catId={item.id}
      />
      )
    })
    let categories = this.state.arrayCategories.map((item, key) => {
      return (
        <CheckboxComp
          key={key}
          updateState={this.handleSkillArr}
          catName={item.trainSkillName}
          catId={item.id}
        />
      )
    });

    let counties = this.state.arrayCounties.map((item, key) => {
      return(
        <CheckboxCounties 
          updateState={this.handleCountiesArr}
          key={key}
          countiesId={item.id}
          countiesName={item.countyName}
        />
      )
    });
    return(
      <div className={css.searchBoxWrapper}>
        <div
          style={{display: this.state.modalCategories}}
          onClick={() => this.openModalCategories()}
          className={css.modalCategoriesClass}>
          <div className={css.categorieModal}>
            <div onClick={(e) => this.stopPropagation(e)} className={css.categorieModalWrapper}>
              {this.props.fizio ? fizio : categories}
            </div>
          </div>
        </div>
        <div 
          style={{display: this.state.modalCounties}}
          onClick={() => this.openModalCounties()}
          className={css.modalCountiesClass}>
          <div  className={css.categorieModal}>
            <div className={css.categorieModalWrapper} onClick={(e) => this.stopPropagation(e)}>
              <div style={{background:"green"}}>
                {counties}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={css.searchBox}>
            {
            this.props.categories?
              <Categorie 
                openModal={this.openModalCategories}
                categoriesAlert={this.props.categoriesAlert}
                nameInCategorie={this.state.nameInCategorie}/>
            : null
            }
            {
            this.props.sertifikat?
              <Sertifikat
                switchTitle={this.props.coaches}
                setCertificat={this.props.certifiedFunc}
                certifiedField={this.props.certifiedField} />
            :<div ></div>
            }
            {
            this.props.counties?
            <Countie
              openModal={this.openModalCounties}
              countiesAlert={this.props.countiesAlert}
              nameInCounties={this.state.nameInCounties} />
            :null
            }
            {
            this.props.group?
              <GroupTrening 
                setTrening={this.props.groupTrainingFunc}
                groupTraining={this.props.groupTraining}/>
            : null
            }
            {
              this.props.fizio?
              <ComingHome 
                sendParams={this.props.comingHomeParams} 
                comingHome={this.props.comingHomeFunc} />
              : null
            }
            {
            this.props.prices?
            <Prices 
              priceFromFunc={this.props.priceFromFunc} 
              getPriceFrom={this.props.priceFrom} 
              priceToFunc={this.props.priceToFunc} 
              getPriceTo={this.props.priceTo} 
              sendParams={this.props.getParams}
            />
            : null
            }
            {
              this.props.searchClubs?
              <SearchClubs sendParams={this.props.runActionForRedux} />
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}
export default SearchBox;
