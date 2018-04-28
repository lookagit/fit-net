import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RegisterInput from './RegisterInput';
import css from '../styles/styles.scss';
import SearchBox from '../searchBox';
import { validatePrice } from './validationFuncs';
import AddMore from '../../../static/add.png';

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
  fisioCategories{
    id
    fisioSkillName
  }
}
`)

@withRouter
@connect(state => ({
  fizio: state.fizio,
  coaches: state.coaches,
}))
class RegisterMoreSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillArr: [],
      countiesAlert: 'none',
      countiesId: '',
      groupTraining: false,
      price: '',
      more: false,
      arrayCategories: [],
      arrayCounties: [],
    };
    this.items = [];
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.data.trainingCategories !== 'undefined') {
      this.setState({ arrayCategories: nextProps.data.trainingCategories });
    }
    if (typeof nextProps.data.counties !== 'undefined') {
      this.setState({ arrayCounties: nextProps.data.counties });
    }
  }

  setMePrice = e => {
    this.setState({
      price: e.target.value,
    });
  }

  groupTainingFunc = isGroup => {
    this.setState({
      groupTraining: isGroup,
    });
  }

  addToCountiesArr = countiesId => {
    this.setState({
      countiesId,
    });
  }

  addToSkillArr = skillId => {
    const { skillArr } = this.state;
    if (skillArr.includes(skillId)) {
      const a = this.state.skillArr;
      const b = a.indexOf(skillId);
      a.splice(b, 1);
      this.setState({
        skillArr: a,
      });
    } else {
      this.setState({
        skillArr: [...skillArr, skillId], //eslint-disable-line
      });
    }
  }

  moreItem = () => {
    const { price, skillArr, countiesId, groupTraining } = this.state;
    const obj = {};
    obj.price = price;
    const filteredName = [];
    skillArr.map(item => {
      this.state.arrayCategories.map(bla => {
        if (bla.id === item) {
          filteredName.push(bla);
        }
      });
    });
    const [filteredNameCounties] = this.state.arrayCounties.filter(item => (
      item.id === countiesId
    ));
    obj.skillArr = filteredName;
    obj.groupTraining = groupTraining;
    obj.counties = { ...filteredNameCounties };
    this.setState({
      price: '',
      countiesId: '',
      groupTraining: false,
    });
    this.items.push(obj);
  }

  render() {
    console.log('evo ti state', this.state);
    return (
      <div>
        <OneItem
          handleSkillArr={this.addToSkillArr}
          handleCounties={this.addToCountiesArr}
          handleTraning={this.groupTainingFunc}
          groupTraining={this.state.groupTraining}
          getValue={this.setMePrice}
        />
        {
          this.items.length
          ?
            this.items.map((item, k) => (
              <DisabledBox
                trening={item.groupTraining}
                counti={item.counties}
                skill={item.skillArr}
                prices={item.price}
              />
            ))
          :
          null
        }
        <div
          onClick={() => {
            this.moreItem();
          }}
          style={{
            position: 'fixed',
            bottom: '10%',
            right: '10%',
          }}
        >
          <img src={AddMore} width="50px" height="50px" alt="AddMore" />
        </div>
      </div>
    );
  }
}

const OneItem = ({ handleSkillArr, handleCounties, handleTraning, groupTraining, getValue }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20 }}>
    <div className={css.registerFisio}>
      <SearchBox
        setCountNumber={3}
        categories
        coaches
        addToSkillArr={handleSkillArr}
      />
      <SearchBox
        counties
        coaches
        group
        countiesAlert={'none'}
        addToCountiesArr={handleCounties}
        groupTraining={groupTraining}
        groupTrainingFunc={handleTraning}
      />
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
        <h1 className={css.labelStyle}>
          CENA
        </h1>
        <RegisterInput
          placeHolder="Cena"
          type="text"
          updateFunc={e => {
            if (validatePrice(e.target.value)) {
              getValue(e);
            } else {
              console.log('unesite broj');
            }
          }}
        />
      </div>
    </div>
  </div>
);

const DisabledBox = ({ trening, skill, counti, prices }) => (
  <div className={css.searchBoxWrapper}>
    <div style={{ marginTop: 20 }}>
      <div className={css.searchBox}>
        <div className={css.categorie}>
          <div className={css.categorieTitle}>
            <p style={{ marginTop: 0, color: '#fff', fontSize: '17px', fontWeight: 'bold' }}>KATEGORIJA</p>
          </div>
          <div
            className={css.categorieButton}>
            <h3 style={{ color: '#a9a9a9', fontWeight: 'bold' }}>{skill.map((item, key) => ( `${item.trainSkillName + ' '}`))}</h3> 
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
        <div className={css.sertifikat}>
          <div className={css.sertifikatBox1}>
            <p>TRENINZI</p>
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
);

export default RegisterMoreSkills;
