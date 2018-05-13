import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Moment from 'moment-timezone';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { blue800, white } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from 'react-loading-components';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import faker from 'faker';
import logoBright from '../../../static/logoBright.png';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
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
      date: 'Nema',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '+381',
      hasCerificates: false,
      personClub: 'Nema',
      skillArr: [],
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/zaluku/person-placeholder.jpg',
      warrningMessage: '',
      snackOpen: false,
      snackMessage: 'Greska!!',
      openDialog: false,
      loading: false,
    };
  }
  handleOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };
  newUser = async () => {
    if (this.state.firstName === '' || !validateStringNames(this.state.firstName)) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Ime ne sme biti prazno i mora imati više od 2 karaktera',
      });
      return;
    }
    if (this.state.lastName === '' || !validateStringNames(this.state.lastName)) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Prezime ne sme biti prazno i mora imati više od 2 karaktera',
      });
      return;
    }
    if (!validateEmail(this.state.email)) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Email format nije u redu',
      });
      return;
    }
    if (!validatePhone(this.state.phone) || this.state.phone === '+381') {
      this.setState({
        snackOpen: true,
        snackMessage: 'Broj telefona nije u redu!',
      });
      return;
    }
    if (this.state.date === '') {
      this.setState({
        snackOpen: true,
        snackMessage: 'Molimo popunite datum rodjenja. Hvala!',
      });
      return;
    }
    if (!/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(this.state.facebookLink)) {
      this.setState({
        openDialog: true,
        facebookLink: 'https://facebook.com/',
        socialMessage: 'Facebook link nije u redu. Predlažemo da odete na svoj Facebook profil i kopirate link iz address bar-a. Ukoliko nemate Facebook profil ostavite ovo polje prazno. Hvala!'
      });
      return;
    }
    if (!/^(https?:\/\/)?((w{3}\.)?)instagram.com\/.*/i.test(this.state.instagramLink)) {
      this.setState({
        openDialog: true,
        instagramLink: 'https://instagram.com/',
        socialMessage: 'Instagram link nije u redu. Predlažemo da odete na svoj Instagram profil i kopirate link iz address bar-a. Ukoliko nemate profil na Instagramu ostavite ovo polje prazno. Hvala!'
      });
      return;
    }
    if (this.state.skillArr.length < 1) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Morate izabrati barem jednu veštinu koju trenirate!',
      });
      return;
    }
    if (this.state.password.length <= 5) {
      this.setState({
        snackOpen: true,
        snackMessage: 'Šifra mora imati više od 5 karaktera!',
      });
    }
    const { password, passwordRepeat } = this.state;
    if (password === passwordRepeat) {
      this.setState({
        loading: true,
      });
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
        skillArr: [...skillArr, parseInt(skillId)],  //eslint-disable-line
        snackOpen: false,
      });
    }
  }
  handleChange = (bla, date) => {
    const d1 = Moment(date).format(); // eslint-disable-line
    const dateformated = d1.slice(0, 10);
    this.setState({
      date: dateformated,
      snackOpen: false,
    });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Ok"
        labelColor="#fff"
        labelStyle={{ fontWeight: '700' }}
        backgroundColor="#1da9ec"
        onClick={this.handleClose}
      />,
    ];
    if (this.state.loading) {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading
            type="puff"
            width={150}
            height={150}
            fill="#f44242"
          />
          <h3
            style={{
              color: '#fff',
            }}
          >
            Molimo sačekajte. Hvala!
          </h3>
        </div>
      );
    }
    return (
      <div className={css.registerFisioWrapper}>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          bodyStyle={{ backgroundColor: '#E91E63' }}
          onRequestClose={this.handleRequestClose}
        />
        <Dialog
          title={(
            <img
              alt="FIT NET"
              src={logoBright}
              width="150px"
              height="75px"
              style={{
                borderRadius: '50%',
              }}
            />
          )}
          paperProps={{
            zDepth: 3,
            style: {
              backgroundColor: '#15233c',
            },
          }}
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
        >
          <h4
            style={{
              color: '#fff',
            }}
          >
            {this.state.socialMessage}
          </h4>
        </Dialog>
        <div className={css.registerFisio}>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>First name</label> */}
              <TextField
                hintText="Unesite ime"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Ime"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%', textTransform: 'capitalize' }}
                className={css.biggerFont}
                errorText={this.state.nameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                onChange={(e, firstName) => {
                  if (validateStringNames(firstName)) {
                    this.setState({
                      snackOpen: false,
                      nameErr: false,
                      firstName,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                      nameErr: true,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="Unesite prezime"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Prezime"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                className={css.biggerFont}
                style={{ width: '100%', textTransform: 'capitalize' }}
                errorText={this.state.lastNameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                onChange={(e, lastName) => {
                  if (validateStringNames(lastName)) {
                    this.setState({
                      snackOpen: false,
                      lastName,
                      lastNameErr: null,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                      lastNameErr: true,
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="Unesite email"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Email"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                className={css.brightFont}
                style={{ width: '100%' }}
                errorText={this.state.emailErr ? 'Molimo unesite ispravan format email-a' : null}
                onChange={(e, email) => {
                  if (validateEmail(email)) {
                    this.setState({
                      emailErr: false,
                      email,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      emailErr: true,
                      snackOpen: false,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <DatePicker
                floatingLabelText="Datum rodjenja"
                hintText="Open to Year"
                openToYearSelection
                className={css.brightFont}
                floatingLabelStyle={{ color: white }}
                textFieldStyle={{ width: '100%' }}
                onChange={this.handleChange} />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="Unesite broj telefona"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Broj telefona"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                type="email"
                className={css.brightFont}
                errorText={this.state.phoneErr ? 'Molimo unesite ispravan broj telefona (npr. +381691112233)' : null}
                value={this.state.phone}
                onChange={(e, phone) => {
                  if (validatePhone(phone)) {
                    this.setState({
                      snackOpen: false,
                      phoneErr: false,
                      phone,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                      phoneErr: true,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="Unesite mesto rodjenja"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Mesto rodjenja"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                className={css.biggerFont}
                errorText={this.state.birthErr ? 'Molimo unesti ispravno mesto rodjenja (npr. Beograd, Zrenjanin, Budva...)' : null}
                onChange={(e, birthPlace) => {
                  if (validateBirthPlace(birthPlace)) {
                    this.setState({
                      birthPlace,
                      snackOpen: false,
                      birthErr: false,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                      birthErr: true,
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="https://www.facebook.com/primer123"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Facebook Link"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                className={css.brightFont}
                errorText={this.state.fbErr ? 'Format linka neispravan' : null}
                onChange={(e, facebookLink) => {
                  if (validateUrl(facebookLink)) {
                    this.setState({
                      facebookLink,
                      fbErr: false,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      fbErr: true,
                      snackOpen: false,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Instagram Link</label> */}
              <TextField
                hintText="https://www.instagram.com/primer123"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Instagram Link"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                className={css.brightFont}
                errorText={this.state.instaErr ? 'Format linka neispravan' : null}
                onChange={(e, instagramLink) => {
                  if (validateUrl(instagramLink)) {
                    this.setState({
                      instagramLink,
                      instaErr: false,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      instaErr: true,
                      snackOpen: false,
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="Unestite šifru"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Šifra"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                type="password"
                className={css.brightFont}
                onChange={(e, password) => {
                  if (validatePassword(password)) {
                    this.setState({
                      password,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <TextField
                hintText="Ponovite šifru"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Ponovite šifru"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                type="password"
                className={css.brightFont}
                errorText={this.state.passErr ? 'Šifre se ne poklapaju!' : null}
                onChange={(e, passwordRepeat) => {
                  if (validatePassword(passwordRepeat)) {
                    if (this.state.password !== passwordRepeat) {
                      this.setState({
                        passwordRepeat,
                        passErr: true,
                        snackOpen: false,
                      });
                    } else {
                      this.setState({
                        passwordRepeat: e.target.value,
                        snackOpen: false,
                        passErr: false,
                      });
                    }
                  } else {
                    this.setState({
                      snackOpen: false,
                      passErr: true,
                    });
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
            <TextField
              hintText="Napišite nešto o sebi. Gde ste radili, koliko se dugo bavite ovim poslom, najvece uspehe, itd..."
              floatingLabelText="O sebi"
              multiLine
              hintStyle={{ color: blue800 }}
              floatingLabelStyle={{ color: white }}
              underlineFocusStyle={{ borderColor: blue800 }}
              rows={3}
              className={css.brightFont}
              style={{ width: '100%' }}
              onChange={(e, about) => {
                this.setState({
                  about,
                });
              }}
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
          <RaisedButton
            label="Registrujte se"
            fullWidth
            labelColor="#fff"
            labelStyle={{ fontWeight: '700' }}
            backgroundColor="#1da9ec"
            onClick={() => {
              this.newUser();
            }} />
        </div>
      </div>
    );
  }
}
export default RegisterPerson;
