import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import faker from 'faker';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment-timezone';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
import RegisterInput from './RegisterInput';
import {
  validateStringNames,
  validateEmail,
  validatePassword,
  validatePhone,
  validateBirthPlace,
  validateUrl,
  validateAbout,
} from './validationFuncs';
import SearchBox from '../searchBox';

const axios = require('axios');

@withRouter
@connect(state => ({
  fizio: state.fizio,
  coaches: state.coaches,
}))
@graphql(gql`
  mutation updateOrCreateFisio(
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
    $fisioSkillsArr: [Int]
  ) {
    updateOrCreateFisio(
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
      fisioSkillsArr: $fisioSkillsArr
    ) {
      id
    }
  }`, {
  name: 'registerNewFisio',
})
class RegisterFisio extends React.Component {
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
      about: null,
      facebookLink: '',
      instagramLink: '',
      phone: '+381',
      hasCerificates: false,
      file: null,
      imgUrl: 'https://google.com',
      skillArr: [],
      warrnMess: null,
    };
  }
  newFisio = async () => {
    const { file } = this.state;
    let uniqueNameForImg = '';
    let fileOk = false;
    if (this.state.file) {
      let url;
      const fakerUuid = faker.random.uuid();
      const fileType = file.type.split('/').pop();
      uniqueNameForImg = `${fakerUuid}.${fileType}`;
      if (process.env.NODE_ENV === 'production') {
        url = 'https://fit-net.herokuapp.com/ping/';
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
    const mutation = await this.props.registerNewFisio(
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
          hasCertificates: this.state.hasCerificates,
          about: this.state.about,
          imageUrl: fileOk ? `https://fitnetbucket.s3.eu-west-3.amazonaws.com/${uniqueNameForImg}` : 'https://placeholder.com',
          fisioSkillsArr: this.state.skillArr,
        },
      },
    );
    if (mutation) {
      const { id } = mutation.data.updateOrCreateFisio;
      this.props.history.push(`/register-certificate/${id}`);
    } else {
      console.log('prsoo', mutation);
    }
  }

  fizioCategories = skillId => {
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
        skillArr: [...skillArr, parseInt(skillId)],
      });
    }
  }

  handleChange = date => {
    const d1 = Moment(date._d).format();
    this.setState({
      date: d1,
      dateSelected: date,
    });
  }

  render() {
    return (
      <div className={css.registerFisioWrapper}>
        <div className={css.registerFisio}>
          <div className={css.registerFisioOne}>
            {/* <h3>Fizio</h3> */}
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
              {/* <label className={css.labelsRegister}>Last name</label> */}
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
              {/* <label className={css.labelsRegister}>Email</label> */}
              <RegisterInput
                placeHolder="Email"
                type="email"
                updateFunc={e => {
                  if (validateEmail(e.target.value)) {
                     this.setState({ email: e.target.value });
                  } else {
                    this.setState({ warrnMess: 'Neispravan format email adrese' });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Birtday Date</label> */}
              <DatePicker
                selected={this.state.dateSelected}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Phone</label> */}
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
              {/* <label className={css.labelsRegister}>Birtday Place</label> */}
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
              {/* <label className={css.labelsRegister}>Facebook Link</label> */}
              <RegisterInput
                placeHolder="Facebook Link"
                type="text"
                updateFunc={e => {
                  if (validateUrl(e.target.value)) {
                     this.setState({ facebookLink: e.target.value });
                  } else {
                    console.warn('nije ok link facebooka!');
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Instagram Link</label> */}
              <RegisterInput
                placeHolder="Instagram Link"
                type="text"
                updateFunc={e => {
                  if (validateUrl(e.target.value)) {
                     this.setState({ instagramLink: e.target.value });
                  } else {
                    console.warn('nije ok link instagram!');
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Password</label> */}
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
              {/* <label className={css.labelsRegister}>Password</label> */}
              <RegisterInput
                placeHolder="Ponovite šifru"
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
            fizio
            categories
            fizioCategories={this.fizioCategories}
          />
        </div>
        <div className={css.registerFisioOne} style={{ justifyContent: 'center' }}>
          <div
            onClick={() => {
              this.newFisio();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '35%',
              height: '50px',
              borderRadius: '10px',
              backgroundColor: '#28a7e9'
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
export default RegisterFisio