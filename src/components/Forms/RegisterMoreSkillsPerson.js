import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RegisterInput from './RegisterInput';
import css from '../styles/styles.scss';
import SearchBox from '../searchBox';
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
@graphql(
  gql`
  mutation PersonCountyCreate($price: Int, $groupTraining: Boolean, $address: String, $personClId: Int, $countyId: Int, $trainingSkillId: Int) {
    PersonCountyCreate(price: $price, groupTraining: $groupTraining, address: $address, personClId: $personClId, countyId: $countyId, trainingSkillId: $trainingSkillId) {
      id
    }
  }`,
  {
    name: 'createMoreSkills',
  },
)
class RegisterMoreSkillsPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillId: 0,
      cityId: 0,
      countiesId: '',
      address: '',
      groupTraining: false,
      price: '',
      arrayCategories: [],
      arrayCounties: [],
      arrayCities: [],
      visibleCounties: false,
      itemId: 0,
      items: [],
      moreItems: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.trainingCategories !== 'undefined') {
      this.setState({ arrayCategories: nextProps.data.trainingCategories });
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

  selectGroup = isGroup => {
    this.setState({
      groupTraining: isGroup,
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
    const { price, skillId, countiesId, groupTraining, cityId, address } = this.state;
    const obj = {};
    obj.price = price;
    const [filteredNameSkillId] = this.state.arrayCategories.filter(item => (
      item.id === skillId
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
    obj.groupTraining = groupTraining;
    obj.address = address;
    obj.id = this.state.itemId;
    this.setState({
      price: '',
      countiesId: '',
      groupTraining: false,
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
    if (this.state.items.length) {
      const { id } = this.props.match.params;
      this.state.items.map(async item => {
        await this.props.createMoreSkills({
          variables: {
            price: parseInt(item.price), //eslint-disable-line
            groupTraining: item.groupTraining,
            address: item.address,
            personClId: parseInt(id), //eslint-disable-line
            countyId: parseInt(item.counties.id), //eslint-disable-line
            trainingSkillId: parseInt(item.skillId.id), //eslint-disable-line
          },
        });
      });
    }
  }

  render() {
    return (
      <div>
        <OneItem
          handleCategoryClick={this.selectCategory}
          handleCityClick={this.selectCity}
          handleCounties={this.selectCounties}
          handleTraning={this.selectGroup}
          valueCategory={this.state.skillId}
          valueCity={this.state.cityId}
          valueCounties={this.state.countiesId}
          valuePrice={this.state.price}
          valueAddress={this.state.address}
          groupTraining={this.state.groupTraining}
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
                trening={item.groupTraining}
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

const OneItem = ({ valueCategory, valueCity, valueCounties, valuePrice, valueAddress, handleCategoryClick, handleCityClick, handleCounties, handleTraning, groupTraining, getValueFromInput, getValueFromAddress, arrayForCategoryes, arrayForCity, arrayForCounties, visibleCounties }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20 }}>
    <div className={css.registerFisio}>
      <div className={css.searchBoxWrapper}>
        <div className={css.searchBox} style={{ paddingTop: 5, paddingBottom: 5 }}>
          <DropdownSelectCategory
            array={arrayForCategoryes}
            selected={valueCategory}
            firstOption="Izaberite kategoriju"
            label="Kategorije"
            styles={{ margin: '0 auto' }}
            handleClick={handleCategoryClick}
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
      <SearchBox
        disableMargin
        group
        groupTraining={groupTraining}
        groupTrainingFunc={handleTraning}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          paddingTop: 0,
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

const DisabledBox = ({ id, skill, trening, counti, prices, city, removeMe, address }) => (
  <div className={css.searchBoxWrapper} style={{}}>
    <div style={{ marginTop: 20 }}>
      <div style={{ opacity: 0.7 }}>
        <div className={css.searchBox}>
          <div className={css.recycleItem}>
            <img alt="delete" src={RecycleItem} width="30" height="30" onClick={() => removeMe(id)} style={{ cursor: 'pointer' }} />
          </div>
          <div className={css.categorie}>
            <div className={css.categorieTitle}>
              <p style={{ marginTop: 0, color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>KATEGORIJA</p>
            </div>
            <div
              className={css.categorieButton}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{skill.trainSkillName}</h3> 
            </div>
          </div>
          <div className={css.categorie}>
            <div className={css.categorieTitle}>
              <p style={{ marginTop: 0, color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>GRAD</p>
            </div>
            <div
              className={css.categorieButton}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{city.cityName}</h3>
            </div>
          </div>
          <div className={css.categorie}>
            <div className={css.categorieTitle}>
              <p style={{ marginTop: 0, color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>OPŠTINA</p>
            </div>
            <div
              className={css.categorieButton}>
              <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{counti.countyName}</h3>
            </div>
          </div>
          <div style={{ paddingRight: 20 }}>
            <h3
              className={css.labelStyle}
            >
              ADRESA
            </h3>
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
              defaultValue={address}
            />
          </div>
          <div className={css.sertifikat}>
            <div className={css.sertifikatBox1}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>TRENINZI</p>
            </div>
            <div className={css.sertifikatBox2}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <label
                  className={css.labelStyle}
                >
                  GRUPNI
                </label>
                <div
                  className={css.radio}
                >
                  <div className={`${!trening ? css.radioOn : css.radioOff}`}>
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
                >
                  <div className={`${trening ? css.radioOn : css.radioOff}`}>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ paddingRight: 20 }}>
            <h3
              className={css.labelStyle}
            >
              CENA
            </h3>
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
              defaultValue={`${prices + ' RSD'}`} //eslint-disable-line
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterMoreSkillsPerson;
