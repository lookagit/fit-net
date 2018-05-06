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
import TextField from 'material-ui/TextField';
import { blue800, white } from 'material-ui/styles/colors';

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
  mutation createFisioCounty($price: Float, $address: String, $fisioClId: Int, $fisioCategoryId: Int, $countyId: Int) {
    createFisioCounty(price: $price, address: $address, fisioClId: $fisioClId, fisioCategoryId: $fisioCategoryId, countyId: $countyId) {
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
      price: '',
      arrayCategories: [],
      arrayCounties: [],
      arrayCities: [],
      visibleCounties: false,
      itemId: 0,
      moreItems: false,
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

  setPrice = price => {
    this.setState({
      price,
    });
  }

  setAddress = address => {
    this.setState({
      address,
    });
  }

  setSalonName = salonName => {
    this.setState({
      salonName,
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
    const { price, skillId, countiesId, cityId, address } = this.state;
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
    obj.address = address;
    obj.id = this.state.itemId;
    this.setState({
      price: '',
      countiesId: '',
      cityId: '',
      skillId: '',
      address: '',
      moreItems: true,
      visibleCounties: false,
      itemId: this.state.itemId + 1,
      items: [...this.state.items, obj],
    });
  }

  removeItem = id => {
    const { items } = this.state;
    const indexFind = items.map(item => (item.id)).indexOf(id);
    items.splice(indexFind, 1);
    if (!items.length) {
      this.setState({
        items,
        moreItems: false,
      });
    } else {
      this.setState({
        items,
      });
    }
  }

  saveSkills = () => {
    if (this.state.skillId !== '' && this.state.countiesId !== '' && this.state.price !== '' && this.state.cityId !== '' && this.state.address) {
      this.moreItem();
    }
    const { id } = this.props.match.params;
    const mutationArray = this.state.items.map(async item => {
      await this.props.createMoreSkills({
        variables: {
          price: parseInt(item.price), //eslint-disable-line
          address: item.address,
          fisioClId: parseInt(id), //eslint-disable-line
          fisioCategoryId: parseInt(item.skillId.id), //eslint-disable-line
          countyId: parseInt(item.counties.id), //eslint-disable-line
        },
      });
    });
    Promise.all(mutationArray).then(() => this.props.history.push(`/fisio-one/${id}`));
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
          getValueFromInput={this.setPrice}
          getValueFromAddress={this.setAddress}
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
            cursor: 'pointer',
            bottom: '10%',
            right: '10%',
            width: 100,
            height: 50,
            textAlign: 'center',
          }}
          className={css.sendParams}
        >
          <h3 style={{ color: 'white', fontWeight: 'bold' }}>Dodaj</h3>
        </div>
        <div
          onClick={() => this.saveSkills()}
          onKeyDown={() => this.handleKeyPress()}
          role="presentation"
          style={{
            position: 'fixed',
            cursor: !this.state.moreItems ? null : 'pointer',
            bottom: '20%',
            right: '10%',
            opacity: !this.state.moreItems ? 0.65 : null,
            width: 100,
            height: 50,
            textAlign: 'center',
          }}
          className={css.sendParams}
        >
          <h3 style={{ color: 'white', fontWeight: 'bold' }}>Završi</h3>
        </div>
      </div>
    );
  }
}

const OneItem = ({ valueCategory, valueCity, valueCounties, valuePrice, valueAddress, handleCategoryClick, handleCityClick, handleCounties, getValueFromInput, getValueFromAddress, arrayForCategoryes, arrayForCity, arrayForCounties, visibleCounties }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20 }}>
    <div className={css.registerFisio}>
      <div className={css.searchBoxWrapper} style={{ paddingTop: 5 }}>
        <div className={css.searchBox} style={{ paddingTop: 0, paddingBottom: 5 }}>
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
        <div className={css.searchBox} style={{ paddingTop: 0, paddingBottom: 5 }}>
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
            <div className={css.searchBox} style={{ paddingTop: 0, paddingBottom: 5 }}>
              <DropdownSelectCounties
                array={arrayForCounties}
                selected={valueCounties}
                firstOption="Izaberite opštinu"
                label="Opštine"
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
          paddingTop: 0,
          paddingBottom: 5,
          width: 700,
          backgroundColor: 'rgba(61, 75, 105, .96)',
          margin: '0 auto',
        }}
      >
        <TextField
          hintText="Unesite adresu"
          hintStyle={{ color: blue800 }}
          floatingLabelText="Adresa"
          floatingLabelStyle={{ color: white }}
          value={valueAddress}
          underlineFocusStyle={{ borderColor: blue800 }}
          style={{ width: '100%' }}
          onChange={(e, address) => {
            getValueFromAddress(address);
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          paddingTop: 0,
          width: 700,
          backgroundColor: 'rgba(61, 75, 105, .96)',
          margin: '0 auto',
        }}
      >
        <TextField
          hintText="Unesite cenu"
          hintStyle={{ color: blue800 }}
          floatingLabelText="Cena"
          floatingLabelStyle={{ color: white }}
          value={valuePrice}
          underlineFocusStyle={{ borderColor: blue800 }}
          style={{ width: '100%' }}
          onChange={(e, price) => {
            if (validatePrice(price)) {
              getValueFromInput(price);
            } else {
              this.setState({
                warrningMessage: 'Neispravan format imena!',
              });
              this.showNotifications();
            }
          }}
        />
      </div>
    </div>
  </div>
);

const DisabledBox = ({ id, skill, counti, prices, city, removeMe, address }) => (
  <div className={css.searchBoxWrapper} style={{}}>
    <div style={{ marginTop: 20 }}>
      <div style={{ opacity: 0.96 }}>
        <div className={css.searchBox}>
          <div className={css.recycleItem}>
            <img alt="delete" src={RecycleItem} width="30" height="30" onClick={() => removeMe(id)} style={{ cursor: 'pointer' }} />
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
              className={css.categorieButton} style={{ marginBottom: 5 }}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{counti.countyName}</h3>
            </div>
          </div>
          <div style={{ paddingRight: 20, paddingBottom: 5 }}>
            <TextField
              disabled
              hintStyle={{ color: blue800 }}
              floatingLabelText="Adresa"
              floatingLabelStyle={{ color: white }}
              value={address}
              underlineFocusStyle={{ borderColor: blue800 }}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ paddingRight: 20, paddingBottom: 5 }}>
            <TextField
              disabled
              hintStyle={{ color: blue800 }}
              floatingLabelText="Cena"
              floatingLabelStyle={{ color: white }}
              value={`${prices + ' RSD'}`} //eslint-disable-line
              underlineFocusStyle={{ borderColor: blue800 }}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterMoreSkillsFisio;
