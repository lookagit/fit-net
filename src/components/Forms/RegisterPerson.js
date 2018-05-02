import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import Moment from 'moment-timezone';
import faker from 'faker';
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
} from './validationFuncs';

const axios = require('axios');

@withRouter
@graphql(gql`
  mutation updateOrCreateUser(
    $email: String,
    $password: String,
    $firstName: String,
    $lastName: String,
    $personClub: String,
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
      personClub: $personClub
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
})
class RegisterPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: null,
      passwordRepeat: null,
      birthPlace: '',
      dateSelected: Moment(),
      date: '',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '+381',
      hasCerificates: false,
      personClub: 'Nema',
      skillArr: [],
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/zaluku/person-placeholder.jpg'
    };
  }

  newUser = async () => {
    const { password, passwordRepeat } = this.state;
    if (password === passwordRepeat) {
      const { file } = this.state;
      let uniqueNameForImg = '';
      let fileOk = false;
      if (this.state.file) {
        let url;
        const fakerUuid = faker.random.uuid();
        const fileType = file.type.split('/').pop();
        uniqueNameForImg = `${fakerUuid}.${fileType}`;
        if (process.env.NODE_ENV === 'production') {
          url = 'https://honesty-app.herokuapp.com/ping/';
        } else {
          url = 'http://localhost:8081/ping/';
        }
        const axiosStuff = await axios.get(`${url}${uniqueNameForImg}/${file.type}`);
        if (axiosStuff) {
          const signedUrl = axiosStuff.data;
          const options = {
            'Content-Type': file.type,
          };
          const putOnServer = await axios.put(signedUrl, file, options);
          if (putOnServer) {
            fileOk = true;
          }
        }
      }
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
            personClub: this.state.personClub,
            imageUrl: fileOk ? `https://s3.eu-central-1.amazonaws.com/zaluku/${uniqueNameForImg}` : 'https://s3.eu-central-1.amazonaws.com/zaluku/person-placeholder.jpg',
            skillsArr: this.state.skillArr,
          },
        },
      );
      if (mutation) {
        const { id } = mutation.data.updateOrCreateUser;
        this.props.history.push(`/register-certificate-person/${id}`);
      }
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
        skillArr: [...skillArr, parseInt(skillId)]  //eslint-disable-line
      });
    }
  }
  handleChange = date => {
    const d1 = Moment(date._d).format(); // eslint-disable-line
    const dateformated = d1.slice(0, 10);
    this.setState({
      date: dateformated,
      dateSelected: date,
    });
  }
  render() {
    return (
      <div className={css.registerFisioWrapper}>
        <div className={css.registerFisio}>
          {
            this.state.warrnMess ?
              <h3
                style={{
                  textAlign: 'center',
                  color: 'red',
                }}
              >
                {`Upozorenje: ${this.state.warrnMess}`}
              </h3> :
              null
          }
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>First name</label> */}
              <RegisterInput
                placeHolder="Ime"
                type="text"
                updateFunc={e => {
                  if (validateStringNames(e.target.value)) {
                     this.setState({ firstName: e.target.value });
                  } else {
                    console.warn('nije ok ime!');
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Prezime"
                type="text"
                updateFunc={e => {
                  if (validateStringNames(e.target.value)) {
                     this.setState({ lastName: e.target.value });
                  } else {
                    console.warn('nije ok prezime!');
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Email"
                type="email"
                updateFunc={e => {
                  if (validateEmail(e.target.value)) {
                     this.setState({
                       email: e.target.value,
                       warrnMess: null,
                      });
                  } else {
                    this.setState({ warrnMess: 'Neispravan format email adrese' }); // eslint-disable-line
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <DatePicker
                selected={this.state.dateSelected}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Broj telefona"
                type="text"
                value={this.state.phone}
                updateFunc={e => {
                  if (validatePhone(e.target.value)) {
                    this.setState({ phone: e.target.value });
                  } else {
                    console.warn('nije ok phone!');
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Mesto rodjenja"
                type="text"
                updateFunc={e => {
                  if (validateBirthPlace(e.target.value)) {
                    this.setState({ birthPlace: e.target.value });
                  } else {
                    console.warn('nije ok birthday place!');
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Facebook Link"
                type="text"
                updateFunc={e => {
                  if (validateUrl(e.target.value)) {
                    this.setState({
                      facebookLink: e.target.value,
                      warrnMess: null,
                    });
                  } else {
                    this.setState({
                      warrnMess: 'Neispravan format linka',
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Instagram Link"
                type="text"
                updateFunc={e => {
                  if (validateUrl(e.target.value)) {
                    this.setState({
                      instagramLink: e.target.value,
                      warrnMess: null,
                    });
                  } else {
                    this.setState({
                      warrnMess: 'Neispravan format linka',
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Šifra"
                type="password"
                updateFunc={e => {
                  if (validatePassword(e.target.value)) {
                    this.setState({ password: e.target.value });
                  } else {
                    console.warn('nije ok password!');
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Ponovite šifru"
                type="password"
                updateFunc={e => {
                  if (validatePassword(e.target.value)) {
                    if (this.state.password !== e.target.value) {
                      this.setState({
                        passwordRepeat: e.target.value,
                        warrnMess: 'Šifre se ne poklapaju',
                      });
                    } else {
                      this.setState({
                        passwordRepeat: e.target.value,
                        warrnMess: null,
                      });
                    }
                  } else {
                    console.warn('nije ok password!');
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <RegisterInput
                placeHolder="Ime kluba"
                type="password"
                updateFunc={e => this.setState({ personClub: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className={css.registerFisioOne}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <textarea
              rows="6"
              cols="80"
              placeholder="Napišite nešto o sebi. Gde ste radili, koliko se dugo bavite ovim poslom, najvece uspehe, itd..."
              value={this.state.about}
              onChange={e => this.setState({ about: e.target.value })}
            />
          </div>
        </div>
        <div className={css.registerFisioOne}>
          <Uppy
            setRegister={injectFile => this.setState({ file: injectFile })}
          />
        </div>
        <div>
          <SearchBox
            coaches
            categories
            addToSkillArr={this.addToSkillArr}
          />
        </div>
        <div className={css.registerFisioOne} style={{ justifyContent: 'center' }}>
          <div  //eslint-disable-line
            onClick={() => {
              this.newUser();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '35%',
              height: '50px',
              borderRadius: '10px',
              backgroundColor: '#28a7e9',
            }}
          >
            <h3
              style={{
                color: '#fff',
                fontWeight: 'bold',
             }}
            >
              REGISTRUJTE SE
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterPerson;
