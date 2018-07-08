import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RegisterInput from '../Forms/RegisterInput';
import css from '../styles/styles.scss';
import SearchBox from '../searchBox';
import { validatePrice } from '../Forms/validationFuncs';
import AddMore from '../../../static/add.png';
import RecycleItem from '../../../static/remove.png';
import DropdownSelectCategory from '../Forms/DropdownSelectCategory';
import DropdownSelectCity from '../Forms/DropdownSelectCity';
import DropdownSelectCounties from '../Forms/DropdownSelectCounties';
import TextField from 'material-ui/TextField';
import { blue800, white } from 'material-ui/styles/colors';

@withRouter

@graphql(
  gql`
  query getCounties {
    counties {
      id,
      countyName
    }
    trainingCategories {
      id
      trainSkillName
    }
  }
  `,
)
@graphql(
  gql`
  mutation createFisioCounty($price: Float, $address: String, $fisioClId: Int, $countyId: Int) {
    createFisioCounty(price: $price, address: $address, fisioClId: $fisioClId, countyId: $countyId) {
      id
      address
      price 
      fisioCounty {
        id
        countyName
      }
    }
  }`,
  {
    name: 'createMoreSkills',
  },
)
@graphql(
  gql`
  mutation FisioCountyRemove($fisioCountyId: Int) {
    FisioCountyRemove(fisioCountyId: $fisioCountyId) {
      status
      message
    }
  }`,
  {
    name: 'removeItemMutation',
  },
)
class EditUserPriceAndLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fisioClId: 0,
      skillId: 0,
      countiesId: '',
      address: '',
      groupTraining: false,
      price: '',
      arrayCategories: [],
      arrayCounties: [],
      visibleCounties: false,
      itemId: 0,
      items: [],
      itemsFromServer: [],
      moreItems: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.trainingCategories !== 'undefined') {
      this.setState({ arrayCategories: nextProps.data.trainingCategories });
    }
    if (typeof nextProps.data.counties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.counties });
    }
  }

  setItemsInLocal = async tmp => {
    const isLogedIn = await window.localStorage.getItem('fbToken');
    if (isLogedIn) {
      const { accessToken } = JSON.parse(isLogedIn);
      if (accessToken) {
        const { userFisio } = accessToken;
        if (tmp.length) {
          userFisio.fisioCounties = [...userFisio.fisioCounties, ...tmp];
        } else {
          userFisio.fisioCounties = [];
        }
        await window.localStorage.setItem('fbToken', JSON.stringify({ accessToken: { ...accessToken, userFisio } }));
      }
    }
  }

  getUser = async () => {
    if (window) {
      const isLogedIn = await window.localStorage.getItem('fbToken');
      if (isLogedIn) {
        const { accessToken } = JSON.parse(isLogedIn);
        if (accessToken) {
          const { userFisio } = accessToken;
          const { fisioCounties, id } = userFisio;
          const greatestId = Math.max.apply(Math,fisioCounties.map((item) => {return item.id;}))
          this.setState({
            fisioClId: id,
            itemId: greatestId + 1,
            items: [...fisioCounties],
            itemsFromServer: [...fisioCounties],
          });
        }
      }
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

  moreItem = () => {
    if (this.state.countiesId !== '' && this.state.price !== '' && this.state.address) {
      const { price, skillId, countiesId, address } = this.state;
      const obj = {};
      obj.price = price;
      const [filteredNameSkillId] = this.state.arrayCategories.filter(item => (
        item.id === skillId
      ));
      const [filteredNameCounties] = this.state.arrayCounties.filter(item => (
        item.id == countiesId
      ));
      obj.skillId = { ...filteredNameSkillId };
      obj.fisioCounty = { ...filteredNameCounties };
      obj.address = address;
      obj.id = this.state.itemId;
      obj.onServer = true;
      this.setState({
        price: '',
        countiesId: '',
        groupTraining: false,
        skillId: '',
        address: '',
        moreItems: true,
        visibleCounties: false,
        itemId: this.state.itemId + 1,
        items: [...this.state.items, obj],
      });
    }
  }

  removeItem = async id => {
    const { items } = this.state;
    const myItems = items.filter(item => item.id === id);
    const [first] = myItems;
    if (first.onServer) {
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
      this.setItemsInLocal(items);
    } else {
      const { data } = await this.props.removeItemMutation({
        variables: {
          fisioCountyId: id,
        },
      });
      if (data.FisioCountyRemove.status === 200) {
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
      this.setItemsInLocal(items);
    }
  }

  saveSkills = () => {
    if (this.state.countiesId !== '' && this.state.price !== '' && this.state.address) {
      this.moreItem();
    }
    const sendOnServer = this.state.items.filter(itemm => itemm.onServer === true).map(async item => {
      return this.props.createMoreSkills({
        variables: {
          price: parseFloat(item.price), //eslint-disable-line
          address: item.address,
          fisioClId: this.state.fisioClId, //eslint-disable-line
          countyId: parseInt(item.fisioCounty.id), //eslint-disable-line
        },
      });
    });
    Promise.all(sendOnServer).then(itemsOnServer => {
      const arrayForMe = itemsOnServer.map(item => ({ ...item.data.createFisioCounty }));
      this.setItemsInLocal(arrayForMe);
      this.setState({
        moreItems: false,
      });
    });
  }

  render() {
    console.log("evo tatta", this.state);
    return (
      <div>
        <div style={{ marginBottom: this.state.items.length ? 0 : 50 }}>
          <OneItem
            handleCategoryClick={this.selectCategory}
            handleCityClick={this.selectCity}
            handleCounties={this.selectCounties}
            handleTraning={this.selectGroup}
            valueCategory={this.state.skillId}
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
                  counti={item.fisioCounty}
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
      </div>
    );
  }
}

const OneItem = ({ valueCategory, valueCity, valueCounties, valuePrice, valueAddress, handleCategoryClick, handleCityClick, handleCounties, handleTraning, groupTraining, getValueFromInput, getValueFromAddress, arrayForCategoryes, arrayForCity, arrayForCounties, visibleCounties }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20 }}>
    <div className={css.registerFisio}>
      <div className={css.searchBoxWrapper}>
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
          className={css.brightFont}
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
        className={css.inputMoreSkills}
      >
        <TextField
          hintText="Unesite cenu u dinarima(RSD)"
          hintStyle={{ color: blue800 }}
          floatingLabelText="Cena"
          className={css.brightFont}
          floatingLabelStyle={{ color: white }}
          value={valuePrice}
          underlineFocusStyle={{ borderColor: blue800 }}
          style={{ width: '100%' }}
          type="number"
          onChange={(e, price) => getValueFromInput(price)}
        />
      </div>
    </div>
  </div>
);

const DisabledBox = ({ id, skill, trening, counti, prices, removeMe, address }) => (
  <div className={css.searchBoxWrapper} style={{}}>
    <div style={{ marginTop: 20, marginBottom: 45 }}>
      <div style={{ opacity: 0.96 }}>
        <div className={css.searchBox}>
          <div className={css.recycleItem}>
            <img alt="delete" src={RecycleItem} width="30" height="30" onClick={() => removeMe(id)} style={{ cursor: 'pointer' }} />
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
          <div style={{ paddingRight: 20 }}>
            <TextField
              disabled
              hintStyle={{ color: blue800 }}
              floatingLabelText="Cena"
              className={css.brightFont}
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

export default EditUserPriceAndLocation;
