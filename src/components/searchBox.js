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
      arrayCategories: [],
      arrayCounties: [],
      modalCategories: 'none',
      modalCounties: 'none',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.trainingCategories != undefined) {
      this.setState({arrayCategories: nextProps.data.trainingCategories})
    }
    if(nextProps.data.counties != undefined) {
      this.setState({arrayCounties: nextProps.data.counties})
    }
  }

  handleSkillArr = (gotSkill) => {
    this.props.addToSkillArr(gotSkill)
  }
  handleCountiesArr = (gotId) => {
    this.props.addToCountiesArr(gotId);
  }

  openModalCategories() {
    this.setState({
      modalCategories: this.state.modalCategories == 'none' ? 'block' : 'none'
    })
  }
  openModalCounties() {
    this.setState({
      modalCounties: this.state.modalCounties == 'none' ? 'block' : 'none'
    })
  }
  stopPropagation(e){
    e.stopPropagation();
  }

  render() {
    console.log('dasdasd', this.props)
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
    let styles = {
      height:'100%',
      width:'100%',
      backgroundColor:'rgba(0,0,0,.5)',
      position:'absolute',
      top:'0',
      left:'0',
      display: this.state.modalCategories,
      zIndex: 1001
    }
    let styless = {
      height:'100%',
      width:'100%',
      backgroundColor:'rgba(0,0,0,.5)',
      position:'absolute',
      top:'0',
      left:'0',
      display: this.state.modalCounties,
      zIndex: 1001
    }
    return(
      <div className={css.searchBoxWrapper}>
        <div onClick={() => this.openModalCategories()} style={styles}>
          <div className={css.categorieModal}>
            <div onClick={(e) => this.stopPropagation(e)} className={css.categorieModalWrapper}>
              {categories}
            </div>
          </div>
        </div>
        <div onClick={() => this.openModalCounties()} style={styless}>
          <div  className={css.categorieModal}>
            <div style={{backgroundColor:"white",height:"500px",width:"300px"}} onClick={(e) => this.stopPropagation(e)}>
              {counties}
            </div>
          </div>
        </div>




        <div className={css.searchBox}>
            <div className={css.categorie}>
              <div 
                onClick={() => this.openModalCategories()}
                className={css.categorieButton}>
                Izaberite oblast
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
                onClick={() => this.openModalCounties()}
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
