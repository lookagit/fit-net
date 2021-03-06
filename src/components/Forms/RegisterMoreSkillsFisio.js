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
  query getCounties {
    counties {
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
)
@graphql(
  gql`
  mutation createFisioCounty($price: Float, $address: String, $fisioClId: Int,$countyId: Int) {
    createFisioCounty(price: $price, address: $address, fisioClId: $fisioClId, countyId: $countyId) {
      id
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
      countiesId: '',
      address: '',
      price: '',
      arrayCategories: [],
      arrayCounties: [],
      visibleCounties: false,
      itemId: 0,
      moreItems: false,
      items: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.getCities !== 'undefined') {
      this.setState({ arrayCities: nextProps.data.getCities });
    }
    if (typeof nextProps.data.counties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.counties });
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
  selectCategory = e => {
    this.setState({
      skillId: e.target.value,
    });
  }

  selectCity = async e => {
    let id = parseInt(e.target.value); //eslint-disable-line
    await this.props.data.refetch();
    this.setState({
      visibleCounties: true,
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
    if (this.state.countiesId !== '' && this.state.price !== '' && this.state.address) {
      const { price, skillId, countiesId, address } = this.state;
      const obj = {};
      obj.price = price;
      const [filteredNameSkillId] = this.state.arrayCategories.filter(item => (
        item.id == skillId
      ));
      const [filteredNameCounties] = this.state.arrayCounties.filter(item => (
        item.id == countiesId
      ));
      obj.skillId = { ...filteredNameSkillId };
      obj.counties = { ...filteredNameCounties };
      obj.address = address;
      obj.id = this.state.itemId;
      this.setState({
        price: '',
        countiesId: '',
        skillId: '',
        address: '',
        moreItems: true,
        visibleCounties: false,
        itemId: this.state.itemId + 1,
        items: [...this.state.items, obj],
      });
    }
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
    if (this.state.countiesId !== '' && this.state.price !== '' && this.state.address) {
      this.moreItem();
    }
    const { id } = this.props.match.params;
    if (this.state.items.length) {
      const mutationArray = this.state.items.map(async item => {
        await this.props.createMoreSkills({
          variables: {
            price: parseInt(item.price), //eslint-disable-line
            address: item.address,
            fisioClId: parseInt(id), //eslint-disable-line
            countyId: parseInt(item.counties.id), //eslint-disable-line
          },
        });
      });
      Promise.all(mutationArray).then(() => this.props.history.push(`/fisio-one/${id}`));
    }
  }

  render() {
    return (
      <div>
        <OneItem
          handleCategoryClick={this.selectCategory}
          handleCityClick={this.selectCity}
          handleCounties={this.selectCounties}
          valueCategory={this.state.skillId}
          valueCounties={this.state.countiesId}
          valuePrice={this.state.price}
          valueAddress={this.state.address}
          getValueFromInput={this.setPrice}
          getValueFromAddress={this.setAddress}
          arrayForCategoryes={this.state.arrayCategories}
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
          className={css.setMoreSkillsButton}
        >
          <h3 style={{ color: 'white', fontWeight: 'bold' }}>Dodaj</h3>
        </div>
        <div
          onClick={() => this.saveSkills()}
          onKeyDown={() => this.handleKeyPress()}
          role="presentation"
          className={!this.state.moreItems ? css.endMoreSkillsButton : css.endMoreSkillsButtonPointer}
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
          <DropdownSelectCounties
            array={arrayForCounties}
            selected={valueCounties}
            firstOption="Izaberite opštinu"
            label="Opštine"
            styles={{ margin: '0 auto' }}
            handleClick={handleCounties}
          />
        </div>
      </div>
      <div
        className={css.inputMoreSkills}
      >
        <TextField
          hintText="Unesite adresu"
          hintStyle={{ color: blue800 }}
          floatingLabelText="Adresa"
          floatingLabelStyle={{ color: white }}
          value={valueAddress}
          underlineFocusStyle={{ borderColor: blue800 }}
          style={{ width: '100%' }}
          className={css.brightFont}
          onChange={(e, address) => {
            getValueFromAddress(address);
          }}
        />
      </div>
      <div
        className={css.inputMoreSkills}
      >
        <TextField
          hintText="Unesite cenu u dinarima(RSD)"
          hintStyle={{ color: blue800 }}
          floatingLabelText="Cena"
          floatingLabelStyle={{ color: white }}
          value={valuePrice}
          underlineFocusStyle={{ borderColor: blue800 }}
          style={{ width: '100%' }}
          type="number"
          className={css.brightFont}
          onChange={(e, price) => getValueFromInput(price)}
        />
      </div>
    </div>
  </div>
);

const DisabledBox = ({ id, skill, counti, prices, removeMe, address }) => (
  <div className={css.searchBoxWrapper} style={{}}>
    <div style={{ marginTop: 20, marginBottom: 45 }}>
      <div style={{ opacity: 0.96 }}>
        <div className={css.searchBox}>
          <div className={css.recycleItem}>
            <img alt="delete" src={RecycleItem} width="30" height="30" onClick={() => removeMe(id)} style={{ cursor: 'pointer' }} />
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
              className={css.brightFont}
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
              className={css.brightFont}
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
