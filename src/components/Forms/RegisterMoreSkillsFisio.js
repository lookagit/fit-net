import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RegisterInput from './RegisterInput';
import css from '../styles/styles.scss';
import { validatePrice } from './validationFuncs';
import AddMore from '../../../static/add.png';
import RecycleItem from '../../../static/remove.png';
import DropdownSelectCategory from './DropdownSelectCategory';
import DropdownSelectCity from './DropdownSelectCity';
import DropdownSelectCounties from './DropdownSelectCounties';

@withRouter

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
@graphql(
  gql`
  mutation createFisioCounty($price: Float, $saloonName: String, $address: String, $fisioClId: Int, $fisioCategoriesId: Int, $countyId: Int) {
    createFisioCounty(price: $price, saloonName: $saloonName, address: $address, fisioClId: $fisioClId, fisioCategoriesId: $fisioCategoriesId, countyId: $countyId) {
      id
      fisioCategory {
        id
      }
      fisioCounty{
        id
      }
    }
  }`,
  {
    name: 'createMoreSkills',
  },
)
class RegisterMoreSkillsFisio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillId: 0,
      cityId: 0,
      countiesId: '',
      address: '',
      salonName: '',
      price: '',
      arrayCategories: [],
      arrayCounties: [],
      arrayCities: [],
      visibleCounties: false,
      itemId: 0,
      items: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.fisioCategories !== 'undefined') {
      this.setState({ arrayCategories: nextProps.data.fisioCategories });
    }
    if (typeof nextProps.data.getCities !== 'undefined') {
      this.setState({ arrayCities: nextProps.data.getCities });
    }
    if (typeof nextProps.data.getCounties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.getCounties });
    }
  }

  setPrice = e => {
    this.setState({
      price: e.target.value,
    });
  }

  setAddress = e => {
    this.setState({
      address: e.target.value,
    });
  }

  setSalonName = e => {
    this.setState({
      salonName: e.target.value,
    });
  }
  selectCategory = e => {
    this.setState({
      skillId: e.target.value,
    });
  }

  selectCity = async e => {
    let id = parseInt(e.target.value); //eslint-disable-line
    await this.props.data.refetch({ cityId: id });
    this.setState({
      visibleCounties: true,
      cityId: id,
    });
  }

  selectCounties = e => {
    this.setState({
      countiesId: e.target.value,
    });
  }

  handleKeyPress = target => {
    if (target.charCode == 13) {
      this.moreItem();
    }
  }

  moreItem = async () => {
    const { price, skillId, countiesId, salonName, cityId, address } = this.state;
    const obj = {};
    obj.price = price;
    const [filteredNameSkillId] = this.state.arrayCategories.filter(item => (
      item.id == skillId
    ));
    const [filteredNameCityId] = this.state.arrayCities.filter(item => (
      item.id === cityId
    ));
    const [filteredNameCounties] = this.state.arrayCounties.filter(item => (
      item.id == countiesId
    ));
    obj.skillId = { ...filteredNameSkillId };
    obj.cityId = { ...filteredNameCityId };
    obj.counties = { ...filteredNameCounties };
    obj.salonName = salonName;
    obj.address = address;
    obj.id = this.state.itemId;
    this.setState({
      price: '',
      countiesId: '',
      salonName: '',
      cityId: '',
      skillId: '',
      address: '',
      visibleCounties: false,
      itemId: this.state.itemId + 1,
      items: [...this.state.items, obj],
    });
  }

  removeItem = id => {
    const { items } = this.state;
    const indexFind = items.map(item => (item.id)).indexOf(id);
    items.splice(indexFind, 1);
    this.setState({
      items,
    });
  }

  saveSkills = () => {
    const { id } = this.props.match.params;
    console.log('evo ti ovaj items',this.state.items);
    this.state.items.map(async item => {
      const bla = await this.props.createMoreSkills({
        variables: {
          price: parseInt(item.price), //eslint-disable-line
          saloonName: item.salonName,
          address: item.address,
          fisioClId: parseInt(id), //eslint-disable-line
          fisioCategoriesId: parseInt(item.skillId.id), //eslint-disable-line
          countyId: parseInt(item.counties.id), //eslint-disable-line
        },
      });
      console.log('evo ti ovaj mrtvi fisio', bla)
    });
  }

  render() {
    return (
      <div>
        <OneItem
          handleCategoryClick={this.selectCategory}
          handleCityClick={this.selectCity}
          handleCounties={this.selectCounties}
          valueCategory={this.state.skillId}
          valueCity={this.state.cityId}
          valueCounties={this.state.countiesId}
          valuePrice={this.state.price}
          valueAddress={this.state.address}
          valueSalonName={this.state.salonName}
          getValueFromInput={this.setPrice}
          getValueFromAddress={this.setAddress}
          getValueFromSalon={this.setSalonName}
          arrayForCategoryes={this.state.arrayCategories}
          arrayForCity={this.state.arrayCities}
          arrayForCounties={this.state.arrayCounties}
          visibleCounties={this.state.visibleCounties}
        />
        {
          this.state.items.length
          ?
            this.state.items.map((item, k) => (
              <DisabledBox
                key={k}
                id={item.id}
                removeMe={this.removeItem}
                salonName={item.salonName}
                counti={item.counties}
                skill={item.skillId}
                city={item.cityId}
                prices={item.price}
                address={item.address}
              />
            ))
          :
          null
        }
        <div
          onClick={() => this.moreItem()}
          onKeyDown={() => this.handleKeyPress()}
          role="presentation"
          style={{
            position: 'fixed',
            bottom: '10%',
            right: '10%',
          }}
        >
          <img src={AddMore} width="50px" height="50px" alt="AddMore" />
        </div>
        <div
          onClick={() => this.saveSkills()}
          onKeyDown={() => this.handleKeyPress()}
          role="presentation"
          style={{
            position: 'fixed',
            bottom: '30%',
            right: '8%',
            backgroundColor: '#0f5a8b',
            width: 100,
            height: 50,
            textAlign: 'center',
          }}
        >
          <p style={{ marginTop: 15 }}>Sacuvaj</p>
        </div>
      </div>
    );
  }
}

const OneItem = ({ valueCategory, valueCity, valueCounties, valuePrice, valueAddress, valueSalonName, handleCategoryClick, handleCityClick, handleCounties, getValueFromInput, getValueFromAddress, getValueFromSalon, arrayForCategoryes, arrayForCity, arrayForCounties, visibleCounties }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20 }}>
    <div className={css.registerFisio}>
      <div className={css.searchBoxWrapper}>
        <div className={css.searchBox}>
          <DropdownSelectCategory
            array={arrayForCategoryes}
            selected={valueCategory}
            firstOption="Izaberite kategoriju"
            label="Kategorije"
            styles={{ margin: '0 auto' }}
            handleClick={handleCategoryClick}
            fisio
          />
        </div>
        <div className={css.searchBox}>
          <DropdownSelectCity
            array={arrayForCity}
            selected={valueCity}
            firstOption="Izaberite grad"
            label="Grad"
            styles={{ margin: '0 auto' }}
            handleClick={handleCityClick}
          />
        </div>
        {
          visibleCounties
          ?
            <div className={css.searchBox}>
              <DropdownSelectCounties
                array={arrayForCounties}
                selected={valueCounties}
                firstOption="Izaberite opstinu"
                label="Opstine"
                styles={{ margin: '0 auto' }}
                handleClick={handleCounties}
              />
            </div>
          :
           null
        }
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          width: 700,
          backgroundColor: 'rgba(61, 75, 105, .7)',
          margin: '0 auto',
        }}
      >
        <h3 style={{ color: 'white', padding: 5 }}>
          Adresa
        </h3>
        <RegisterInput
          placeHolder="Adresa"
          type="text"
          styles={{
            border: 'none',
            borderRadius: 5,
            fontSize: 18,
            height: 60,
            outline: 'none',
            paddingLeft: 20,
          }}
          disableClass
          value={valueAddress}
          updateFunc={e => {
            getValueFromAddress(e);
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          width: 700,
          backgroundColor: 'rgba(61, 75, 105, .7)',
          margin: '0 auto',
        }}
      >
        <h3 style={{ color: 'white', padding: 5 }}>
          Naziv salona
        </h3>
        <RegisterInput
          placeHolder="Naziv salona"
          type="text"
          styles={{
            border: 'none',
            borderRadius: 5,
            fontSize: 18,
            height: 60,
            outline: 'none',
            paddingLeft: 20,
          }}
          disableClass
          value={valueSalonName}
          updateFunc={e => {
            getValueFromSalon(e);
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          width: 700,
          backgroundColor: 'rgba(61, 75, 105, .7)',
          margin: '0 auto',
        }}
      >
        <h3 style={{ color: 'white', padding: 5 }}>
          Cena
        </h3>
        <RegisterInput
          placeHolder="Cena"
          type="text"
          styles={{
            border: 'none',
            borderRadius: 5,
            fontSize: 18,
            height: 60,
            outline: 'none',
            paddingLeft: 20,
          }}
          disableClass
          value={valuePrice}
          updateFunc={e => {
            if (validatePrice(e.target.value)) {
              getValueFromInput(e);
            } else {
              console.log('unesite broj');
            }
          }}
        />
      </div>
    </div>
  </div>
);

const DisabledBox = ({ id, skill, counti, prices, city, removeMe, address, salonName }) => (
  <div className={css.searchBoxWrapper} style={{}}>
    <div style={{ marginTop: 20 }}>
      <div style={{ opacity: 0.7 }}>
        <div className={css.searchBox}>
          <div className={css.recycleItem}>
            <img alt="delete" src={RecycleItem} width="30" height="30" onClick={() => removeMe(id)} />
          </div>
          <div className={css.categorie}>
            <div className={css.categorieTitle}>
              <p style={{ marginTop: 0, color: '#fff', fontSize: '17px', fontWeight: 'bold' }}>KATEGORIJA</p>
            </div>
            <div
              className={css.categorieButton}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{skill.fisioSkillName}</h3>
            </div>
          </div>
          <div className={css.categorie}>
            <div className={css.categorieTitle}>
              <p style={{ marginTop: 0, color: '#fff', fontSize: '17px', fontWeight: 'bold' }}>GRAD</p>
            </div>
            <div
              className={css.categorieButton}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{city.cityName}</h3>
            </div>
          </div>
          <div className={css.categorie}>
            <div className={css.categorieTitle}>
              <p style={{ marginTop: 0, color: '#fff', fontSize: '17px', fontWeight: 'bold' }}>OPŠTINA</p>
            </div>
            <div
              className={css.categorieButton}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{counti.countyName}</h3>
            </div>
          </div>
          <div style={{ paddingRight: 20 }}>
            <h1
              className={css.labelStyle}
            >
              ADRESA
            </h1>
            <br />
            <input
              style={{
                border: 'none',
                borderRadius: 5,
                fontSize: 18,
                height: 40,
                outline: 'none',
                paddingLeft: 20,
                width: '100%',
              }}
              value={address}
            />
          </div>
          <div style={{ paddingRight: 20 }}>
            <h1
              className={css.labelStyle}
            >
              NAZIV SALONA
            </h1>
            <br />
            <input
              style={{
                border: 'none',
                borderRadius: 5,
                fontSize: 18,
                height: 40,
                outline: 'none',
                paddingLeft: 20,
                width: '100%',
              }}
              value={salonName}
            />
          </div>
          <div style={{ paddingRight: 20 }}>
            <h1
              className={css.labelStyle}
            >
              CENA
            </h1>
            <br />
            <input
              style={{
                border: 'none',
                borderRadius: 5,
                fontSize: 18,
                height: 40,
                outline: 'none',
                paddingLeft: 20,
                width: '100%',
              }}
              value={`${prices + ' RSD'}`} //eslint-disable-line
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterMoreSkillsFisio;
