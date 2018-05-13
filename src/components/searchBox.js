import React from 'react';
import css from './styles/styles.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CheckboxComp from './CheckboxComp';
import CheckboxCounties from './CheckboxCounties';
import Categorie from './SearchDumb/categorie';
import Sertifikat from './SearchDumb/sertifikat';
import Countie from './SearchDumb/countie';
import GroupTrening from './SearchDumb/groupTrening';
import Prices from './SearchDumb/prices';
import SearchClubs from './SearchDumb/searchClubs';
import ComingHome from './SearchDumb/comingHome';
import DropdownSelectCity from './Forms/DropdownSelectCity';
import DropdownSelectCounties from './Forms/DropdownSelectCounties';
// @graphql(gql`
// {
//   trainingCategories {
//     id
//     trainSkillName
//   }
//   counties {
//     id
//     countyName
//   }
//   fisioCategories{
//     id
//     fisioSkillName
//   }
// }
// `)

@graphql(
  gql`
  query getCounties(
    $cityId: Int
  ) {
    getCounties(
      cityId: $cityId,
    ) {
      id
      countyName
    }
    getCities{
      id,
      cityName
    }
    fisioCategories{
      id
      fisioSkillName
    }
    trainingCategories {
      id
      trainSkillName
    }
  }
  `,
  {
    options: props => ({
      variables: {
        cityId: 1,
      },
    }),
  },
)

class SearchBox extends React.Component {
  constructor(props) {
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
      clickCount: 0,
      clickCountie: 0,
      arrayCities: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.trainingCategories !== 'undefined') {
      this.setState({ arrayCategories: nextProps.data.trainingCategories });
    }
    if (typeof nextProps.data.counties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.counties });
    }
    if (typeof nextProps.data.fisioCategories !== 'undefined') {
      this.setState({ arrayFizio: nextProps.data.fisioCategories });
    }
    if (typeof nextProps.data.getCities !== 'undefined') {
      this.setState({ arrayCities: nextProps.data.getCities });
    }
    if (typeof nextProps.data.getCounties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.getCounties });
    }
  }


  handleSkillArr = (gotSkill, gotName) => {
    const { nameInCategorie } = this.state;
    if (nameInCategorie.includes(gotName)) {
      const a = this.state.nameInCategorie;
      const b = a.indexOf(gotName);
      a.splice(b, 1);
      this.setState({
        nameInCategorie: a,
        clickCount: this.state.clickCount - 1
      });
    } else {
      this.setState({
        nameInCategorie: [...nameInCategorie, gotName],
        clickCount: this.state.clickCount + 1,
      });
    }
    if (this.props.clubs) {
      this.props.selectCategories(parseInt(gotSkill));
    } else if (this.props.coaches) {
      this.props.addToSkillArr(gotSkill);
    } else if (this.props.fizio) {
      this.props.fizioCategories(gotSkill);
    }
  }
  handleCountiesArr = (gotId, gotName) => {
    const { nameInCounties } = this.state;
    if (nameInCounties.includes(gotName)) {
      const a = this.state.nameInCounties;
      const b = a.indexOf(gotName);
      a.splice(b, 1);
      this.setState({
        nameInCounties: a,
        clickCountie: this.state.clickCountie - 1
      });
    } else {
      this.setState({
        nameInCounties: [gotName],
        clickCountie: this.state.clickCountie + 1
      });
    }
    if (this.props.clubs) {
      this.props.selectCounties(gotId);
    } else if (this.props.coaches) {
      this.props.addToCountiesArr(gotId);
    } else if (this.props.fizio) {
      this.props.fizioCounties(gotId);
    }
  }

  openModalCategories = () => {
    this.setState({
      modalCategories: this.state.modalCategories === 'none' ? 'block' : 'none',
    });
  }
  openModalCounties = () => {
    this.setState({
      modalCounties: this.state.modalCounties === 'none' ? 'block' : 'none',
    });
  }
  sendGroupTraining() {
    this.setState({
      groupTraining: !this.state.groupTraining
    });
  }
  stopPropagation = e => {
    e.stopPropagation();
  }
  // sendParams = () => {
  //   this.props.getParams('poslato')
  // }
  render() {
    const fizio = this.state.arrayFizio.map((item, key) => {
      return (
        <CheckboxComp
          clickCount={this.state.clickCount}
          key={key}
          updateState={this.handleSkillArr}
          catName={item.fisioSkillName}
          catId={item.id}
        />
      );
    });
    const categories = this.state.arrayCategories.map((item, key) => {
      return (
        <CheckboxComp
          clickCount={this.state.clickCount}
          key={key}
          updateState={this.handleSkillArr}
          catName={item.trainSkillName}
          catId={item.id}
        />
      );
    });

    const counties = this.state.arrayCounties.map((item, key) => (
      <CheckboxCounties 
        clickCount={this.state.clickCountie}
        updateState={this.handleCountiesArr}
        key={key}
        countiesId={item.id}
        countiesName={item.countyName}
      />
    ));
    return (
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
              {counties}
            </div>
          </div>
        </div>
        <div>
          <div className={css.searchBox}>
            {
            this.props.categories ?
              <Categorie 
                openModal={this.openModalCategories}
                categoriesAlert={this.props.categoriesAlert}
                nameInCategorie={this.state.nameInCategorie}
              />
            : null
            }
            {
            this.props.sertifikat ?
              <Sertifikat
                switchTitle={this.props.coaches}
                setCertificat={this.props.certifiedFunc}
                certifiedField={this.props.certifiedField} 
              />
            : null
            }
            {
              this.props.counties && this.props.visibleCounties
              ?
                <div>
                  <div style={{ paddingTop: 0, paddingBottom: 5 }}>
                    <DropdownSelectCity
                      array={this.props.arrayForCity}
                      selected={this.props.valueCity}
                      firstOption="Izaberite grad"
                      label="Grad"
                      styles={{ margin: '0 auto' }}
                      handleClick={this.props.handleCityClick}
                    />
                  </div>
                  <div style={{ paddingTop: 0, paddingBottom: 5 }}>
                    <DropdownSelectCounties
                      array={this.props.arrayForCounties}
                      selected={this.props.valueCounties}
                      firstOption="Izaberite opštinu"
                      label="Opštine"
                      styles={{ margin: '0 auto' }}
                      handleClick={this.props.handleCounties}
                    />
                  </div>
                </div>
              :
                <div style={{ paddingTop: 0, paddingBottom: 5 }}>
                  <DropdownSelectCity
                    array={this.props.arrayForCity}
                    selected={this.props.valueCity}
                    firstOption="Izaberite grad"
                    label="Grad"
                    styles={{ margin: '0 auto' }}
                    handleClick={this.props.handleCityClick}
                  />
                </div>
            }
            {
              this.props.group ?
                <GroupTrening
                  disableMarginOnSertificatesCss={this.props.disableMargin}
                  setTrening={this.props.groupTrainingFunc}
                  groupTraining={this.props.groupTraining}
                />
              : null
            }
            {
              this.props.fizio ?
                <ComingHome
                  comingHomeParams={this.props.comingHomeParams}
                  comingHomeFunc={this.props.comingHomeFunc}
                />
              : null
            }
            {
              this.props.prices ?
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
              this.props.searchClubs ?
                <SearchClubs
                  sendParams={this.props.runActionForRedux} 
                />
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}
export default SearchBox;
