import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import css from '../styles/styles.scss';
import SearchBox from '../searchBox';
import RecycleItem from '../../../static/remove.png';
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
  mutation createMembershipFees($price: Int, $clubClId: Int, $trainingSkillId: Int, $description: String) {
    createMembershipFees(price: $price, clubClId: $clubClId, trainingSkillId: $trainingSkillId, description: $description) {
      id
    }
  }`,
  {
    name: 'createMembership',
  },
)
class MembershipCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      moreItems: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.trainingCategories !== 'undefined') {
      this.setState({ arrayCategories: nextProps.data.trainingCategories });
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

  selectCategory = e => {
    this.setState({
      skillId: e.target.value,
    });
  }

  handleKeyPress = target => {
    if (target.charCode == 13) {
      this.moreItem();
    }
  }

  moreItem = async () => {
    if (this.state.countiesId !== '' && this.state.price !== '' && this.state.address) {
      const { price, skillId, countiesId, groupTraining, address } = this.state;
      const obj = {};
      obj.price = price;
      const [filteredNameSkillId] = this.state.arrayCategories.filter(item => (
        item.id === skillId
      ));
      const [filteredNameCounties] = this.state.arrayCounties.filter(item => (
        item.id == countiesId
      ));
      obj.trainingSkillId = { ...filteredNameSkillId };
      obj.counties = { ...filteredNameCounties };
      obj.groupTraining = groupTraining;
      obj.address = address;
      obj.id = this.state.itemId;
      this.setState({
        price: '',
        countiesId: '',
        groupTraining: false,
        trainingSkillId: '',
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
    if (this.state.items.length) {
      this.props.changeToLoad();
      const { clubId } = this.props.match.params;
      this.state.items.map(async item => {
        await this.props.createMoreSkills({
          variables: {
            price: parseInt(item.price), //eslint-disable-line
            clubClId: parseInt(clubClId), //eslint-disable-line
            trainingSkillId: parseInt(item.trainingSkillId), //eslint-disable-line
            description: '',
          },
        });
      });
      this.props.history.push(`/clubs-one/${id}`);
    }
  }

  render() {
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
      <SearchBox
        disableMargin
        group
        groupTraining={groupTraining}
        groupTrainingFunc={handleTraning}
      />
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

export default MembershipCreate;
