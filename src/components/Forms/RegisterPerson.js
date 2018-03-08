import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import Moment from 'moment-timezone';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
import RegisterInput from './RegisterInput';
import SearchBox from '../searchBox';
import {
  validateStringNames,
  validateEmail,
  validatePassword,
  validatePhone,
  validateBirthPlace,
  validateUrl,
  validateAbout,
} from './validationFuncs';

@withRouter
@graphql(gql`
  mutation updateOrCreateUser(
    $email: String,
    $password: String,
    $firstName: String,
    $lastName: String,
    $facebookLink: String,
    $instagramLink: String,
    $cellPhone: String,
    $birthPlace: String,
    $birthDay: String,
    $hasCerificates: Boolean,
    $about: String,
    $imageUrl: String,
    $skillsArr: [Int]
  ) {
    updateOrCreateUser(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      facebookLink: $facebookLink,
      instagramLink: $instagramLink,
      cellPhone: $cellPhone,
      birthPlace: $birthPlace,
      birthDay: $birthDay,
      hasCerificates: $hasCerificates,
      about: $about,
      imageUrl: $imageUrl,
      skillsArr: $skillsArr
    ) {
      id
    }
  }`,
  {
    name: 'registerMe',
  },
)
class RegisterPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthPlace: '',
      dateSelected: Moment(),
      date: '',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '+381',
      hasCerificates: false,
      file: null,
      imgUrl: 'https://google.com',
      arrayFizio: [],
      arrayCategories: [],
      arrayCounties: [],
      countiesId: null,
      skillArr: [],
    }
  }

  newUser = async () => {
    const mutation = await this.props.registerMe(
      {
        variables: {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          facebookLink: this.state.facebookLink,
          instagramLink: this.state.instagramLink,
          cellPhone: this.state.phone,
          birthPlace: this.state.birthPlace,
          birthDay: this.state.date,
          hasCerificates: this.state.hasCerificates,
          about: this.state.about,
          imageUrl: `https://fitnetbucket.s3.eu-west-3.amazonaws.com/`,
          skillsArr: this.state.skillArr,
        },
      },
    );
    if (mutation) {
      const { id } = mutation.data.updateOrCreateUser;
      this.props.history.push(`/register-certificate/${id}`);
    }
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
        skillArr: [...skillArr, parseInt(skillId)]
      });
    }
  }
  handleChange = date => {
    const d1 = Moment(date._d).format();
    const dateformated = d1.slice(0,10);
    this.setState({
      date: dateformated,
      dateSelected: date,
    });
  }
  render() {
    return( 
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>First name</label>
            <RegisterInput
              placeHolder="First name"
              type="text"
              updateFunc={e => {
                if (validateStringNames(e.target.value)) {
                   this.setState({firstName: e.target.value})
                } else {
                  console.warn('nije ok ime!')
                }
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Last name</label>
            <RegisterInput
              placeHolder="Last name"
              type="text"
              updateFunc={e => {
                if (validateStringNames(e.target.value)) {
                   this.setState({lastName: e.target.value})
                } else {
                  console.warn('nije ok prezime!')
                }
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Email</label>
            <RegisterInput
              placeHolder="Email"
              type="text"
              updateFunc={e => {
                if (validateEmail(e.target.value)) {
                   this.setState({email: e.target.value})
                } else {
                  console.warn('nije ok email!')
                }
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>Password</label>
            <RegisterInput
              placeHolder="Password"
              type="text"
              updateFunc={e => {
                if (validatePassword(e.target.value)) {
                   this.setState({password: e.target.value})
                } else {
                  console.warn('nije ok password!')
                }
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Phone</label>
            <RegisterInput
              placeHolder="Phone"
              type="text"
              value={this.state.phone}
              updateFunc={e => {
                if (validatePhone(e.target.value)) {
                   this.setState({phone: e.target.value})
                } else {
                  console.warn('nije ok phone!')
                }
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Birtday Place</label>
            <RegisterInput
              placeHolder="Birthday Place"
              type="text"
              updateFunc={e => {
                if (validateBirthPlace(e.target.value)) {
                   this.setState({birthPlace: e.target.value})
                } else {
                  console.warn('nije ok birthday place!')
                }
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>Birtday Date</label>
            <DatePicker
              selected={this.state.dateSelected}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Facebook Link</label>
            <RegisterInput
              placeHolder="Facebook Link"
              type="text"
              updateFunc={e => {
                if (validateUrl(e.target.value)) {
                   this.setState({facebookLink: e.target.value})
                } else {
                  console.warn('nije ok link facebooka!')
                }
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Instagram Link</label>
            <RegisterInput
              placeHolder="Instagram Link"
              type="text"
              updateFunc={e => {
                if (validateUrl(e.target.value)) {
                   this.setState({instagramLink: e.target.value})
                } else {
                  console.warn('nije ok link instagram!')
                }
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div>
            <label className={css.labelsRegister}>About</label>
            <RegisterInput
              placeHolder="About"
              type="text"
              updateFunc={e => {
                if (validateAbout(e.target.value)) {
                  this.setState({about: e.target.value})
                } else {
                  console.warn('nije ok about!')
                }
              }}
            />
          </div>
          <Uppy setRegister={injectFile => this.setState({file: injectFile })} />
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
          <button onClick={() => {
            this.newUser();
          }}
          >
            REGISTER ME
          </button>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
          <SearchBox
            coaches
            categories
            addToSkillArr={this.addToSkillArr}
          />
        </div>
        
      </div>
    );
  }
} 
export default RegisterPerson;