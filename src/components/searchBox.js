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




        <div className={css.searchBox}>
            <div className={css.categorie}>
              <div 
                onClick={() => this.openModalCategories()}
                className={css.categorieButton}>
                <div 
                  className={css.categoriesAlert}
                  style={{display:`${this.props.categoriesAlert}`}}>
                    Izaberite oblast
                </div>
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
                  <div
                    className={css.radio}
                    onClick={() => this.props.certifiedFunc(true)}>
                    <div className={`${this.props.certifiedField ? css.radioOff : css.radioOn}`}>
                    </div>
                  </div>
                </div>
                <div>
                  <label>Ne</label><br />
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
                  
                  <div
                    className={css.radio}
                    onClick={() => this.props.groupTrainingFunc(true) }>
                    <div className={`${!this.props.groupTraining ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>



                </div>
                <div>
                  <label>Personalni</label><br/>
                  <div
                    className={css.radio}
                    onClick={() => this.props.groupTrainingFunc(false)}>
                    <div className={`${this.props.groupTraining ? css.radioOn : css.radioOff}`}>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            <div className={css.cena}>
              <label >Cena</label><br/>
              <input 
                value={this.props.getPriceFrom}
                type="text" 
                onChange={(val) => this.props.priceFromFunc(val.target.value)} />
              <input
                value={this.props.getPriceTo}
                type="text"
                onChange={(val) => this.props.priceToFunc(val.target.value)} />
              <div 
                className={css.sendParams}
                onClick={() => this.sendParams()}
              >Send</div>
            </div> 
        </div>
      </div>
    )
  }
}
export default SearchBox;
