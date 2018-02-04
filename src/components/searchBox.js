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
`)

class SearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      arrayCategories: [],
      arrayCounties: [],
      modalCategories: 'none',
      modalCounties: 'none',
      groupTraining: false,

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
  sendGroupTraining(){
    this.setState({
      groupTraining: !this.state.groupTraining
    })
  }
  stopPropagation(e){
    e.stopPropagation();
  }
  sendParams(){
    this.props.getParams('poslato')
  }
  render() {
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
      zIndex: 1001,
    }
    let styless = {
      height:'100%',
      width:'100%',
      backgroundColor:'rgba(0,0,0,.5)',
      position:'absolute',
      top:'0',
      left:'0',
      display: this.state.modalCounties,
      zIndex: 1001,
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
            <div className={css.categorieModalWrapper} onClick={(e) => this.stopPropagation(e)}>
              {counties}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '1200px',
          width: '80%',
        }}>
        <div className={css.searchBox}>
          <div className={css.categorie}>
            <p style={{marginTop: 0,color: '#fff', fontSize: '17px', fontWeight: 'bold', }}>Kategorija</p>
              <div 
                onClick={() => this.openModalCategories()}
                className={css.categorieButton}>
                <div 
                  className={css.categoriesAlert}
                  style={{display:`${this.props.categoriesAlert}`}}>
                </div>
                <h3 style={{color: '#a9a9a9', fontWeight: 'bold',}}>Izaberite oblast...</h3>
              </div>
            </div>
            <div className={css.sertifikat}>
              <div className={css.sertifikatBox1}>
               <p> SERTIFIKOVANI TRENERI </p>
              </div>
              <div className={css.sertifikatBox2}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>DA</label>
                  <div
                    className={css.radio}
                    onClick={() => this.props.certifiedFunc(true)}>
                    <div className={`${this.props.certifiedField ? css.radioOff : css.radioOn}`}>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>NE</label>
                  <div 
                    className={css.radio}
                    onClick={() => this.props.certifiedFunc(false)}>
                    <div className={`${!this.props.certifiedField ? css.radioOff : css.radioOn}`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.opstina}>
              <div
                onClick={() => this.openModalCounties()}
                className={css.categorieButton}>
                <div 
                  className={css.countiesAlert}
                  style={{display:`${this.props.countiesAlert}`}}>
                    Izaberite opstinu
                </div>
                <h3 style={{color: '#a9a9a9', fontWeight: 'bold'}}>Izaberite opstinu...</h3>
              </div>
            </div>
            <div  className={css.sertifikat}>
              <div className={css.sertifikatBox1}>
                <p>TRENERI</p>
              </div>
              <div  className={css.sertifikatBox2}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>GRUPNI</label>
                  
                  <div
                    className={css.radio}
                    onClick={() => this.props.groupTrainingFunc(true) }>
                    <div className={`${!this.props.groupTraining ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <label className={css.labelStyle}>PERSONALNI</label>
                  <div
                    className={css.radio}
                    onClick={() => this.props.groupTrainingFunc(false)}>
                    <div className={`${this.props.groupTraining ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',}}>
            <div style={{paddingBottom: '10px'}}>
              <label style={{color: '#fff', fontSize: '17px', fontWeight: '700',}}>CENA</label>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <input
                  style={{    
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    padding: '10px 14px',
                    width: '48.5%',
                  }}
                  placeholder="OD" 
                  value={this.props.getPriceFrom != 0 ? this.props.getPriceFrom : 'OD'}
                  type="number" 
                  onChange={(val) => this.props.priceFromFunc(val.target.value)} />
                <input
                  style={{    
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    padding: '10px 14px',
                    width: '48.5%',
                  }}
                  placeholder="DO" 
                  value={this.props.getPriceTo != 0  ? this.props.getPriceTo : 'DO'}
                  type="number"
                  onChange={(val) => this.props.priceToFunc(val.target.value)} />
              </div>
              <div 
                className={css.sendParams}
                onClick={() => this.sendParams()}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',}}>
                  <h3 style={{
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>TRAŽI</h3> 
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div>
          <h1>DSADASDADS</h1>
        </div>
        </div>
      </div>
    )
  }
}
export default SearchBox;
