import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import faker from 'faker';
import { withRouter } from 'react-router-dom';
import Moment from 'moment-timezone';
import ReactNotifications from 'react-browser-notifications';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { blue800, white } from 'material-ui/styles/colors';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
import RegisterInput from './RegisterInput';
import Logo from '../../../static/logo2.png';
import {
  validateStringNames,
  validateEmail,
  validatePassword,
  validatePhone,
  validateBirthPlace,
  validateUrl,
} from './validationFuncs';
import SearchBox from '../searchBox';

const axios = require('axios');

@withRouter
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
    $comesHome: Boolean,
    $saloonName: String,
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
      comesHome: $comesHome,
      saloonName: $saloonName
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
      passwordRepeat: null,
      birthPlace: '',
      dateSelected: null,
      date: '',
      about: null,
      facebookLink: '',
      instagramLink: '',
      phone: '+381',
      hasCerificates: false,
      comesHome: false,
      file: null,
      saloonName: 'Nema',
      imgUrl: 'https://s3.eu-central-1.amazonaws.com/zaluku/person-placeholder.jpg',
      skillArr: [],
      warrnMess: null,
      warrningMessage: '',
    };
  }
  newFisio = async () => {
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
            imageUrl: fileOk ? `https://s3.eu-central-1.amazonaws.com/zaluku/${uniqueNameForImg}` : 'https://s3.eu-central-1.amazonaws.com/zaluku/person-placeholder.jpg',
            comesHome: this.state.comesHome,
            saloonName: this.state.saloonName,
            fisioSkillsArr: this.state.skillArr,
          },
        },
      );
      if (mutation) {
        const { id } = mutation.data.updateOrCreateFisio;
        this.props.history.push(`/register-certificate/${id}`);
      }
    } else {
      this.setState({
        warrnMess: 'Šifre se ne poklapaju. Molimo vas unesite šifre ponovo!' // eslint-disable-line
      });
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

  handleChange = (bla, date) => {
    const d1 = Moment(date).format(); // eslint-disable-line
    const dateformated = d1.slice(0, 10);
    this.setState({
      date: dateformated,
    });
  }

  comingHomeFunc = comesHome => this.setState({ comesHome })
  
  showNotifications = () => {
    // If the Notifications API is supported by the browser
    // then show the notification
    if (this.n.supported()) this.n.show();
  }

  handleClick = event => {
    // Do something here such as
    // console.log("Notification Clicked") OR
    // window.focus() OR
    // window.open("http://www.google.com")

    // Lastly, Close the notification
    this.n.close(event.target.tag);
  }
  render() {
    return (
      <div className={css.registerFisioWrapper}>
        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Greška!" // Required
          body={this.state.warrningMessage}
          icon={Logo}
          tag="abcdef"
          timeout="2000"
          onClick={event => this.handleClick(event)}
        />
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
              <TextField
                hintText="Unesite ime"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Ime"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                onChange={(e, firstName) => {
                  if (validateStringNames(firstName)) {
                    this.setState({
                      firstName,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format imena!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Last name</label> */}
              <TextField
                hintText="Unesite prezime"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Prezime"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                onChange={(e, lastName) => {
                  if (validateStringNames(lastName)) {
                    this.setState({
                      lastName,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format prezimena!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Email</label> */}
              <TextField
                hintText="Unesite email"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Email"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                onChange={(e, email) => {
                  if (validateEmail(email)) {
                    this.setState({
                      email,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format email adrese!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Birtday Date</label> */}
              <DatePicker
                floatingLabelText="Datum rodjenja"
                hintText="Open to Year"
                openToYearSelection
                floatingLabelStyle={{ color: white }}
                textFieldStyle={{ width: '100%' }}
                onChange={this.handleChange} />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Phone</label> */}
              <TextField
                hintText="Unesite broj telefona"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Broj telefona"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                value={this.state.phone}
                onChange={(e, phone) => {
                  if (validatePhone(phone)) {
                    this.setState({
                      phone,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan broj telefona!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Birtday Place</label> */}
              <TextField
                hintText="Unesite mesto rodjenja"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Mesto rodjenja"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                onChange={(e, birthPlace) => {
                  if (validateBirthPlace(birthPlace)) {
                    this.setState({
                      birthPlace,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format mesta rodjenja!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Facebook Link</label> */}
              <TextField
                hintText="https://www.facebook.com/primer123"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Facebook Link"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                onChange={(e, facebookLink) => {
                  if (validateUrl(facebookLink)) {
                    this.setState({
                      facebookLink,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format facebook profila!',
                    });
                    this.showNotifications();
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
                onChange={(e, instagramLink) => {
                  if (validateUrl(instagramLink)) {
                    this.setState({
                      instagramLink,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format instagram profila!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Password</label> */}
              <TextField
                hintText="Unestite šifru"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Šifra"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                type="password"
                onChange={(e, password) => {
                  if (validatePassword(password)) {
                    this.setState({
                      password,
                    });
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format šifre!',
                    });
                    this.showNotifications();
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Password</label> */}
              <TextField
                hintText="Ponovite šifru"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Ponovite šifru"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%' }}
                type="password"
                onChange={(e, passwordRepeat) => {
                  if (validatePassword(passwordRepeat)) {
                    if (this.state.password !== passwordRepeat) {
                      this.setState({
                        passwordRepeat,
                        warrningMessage: 'Šifre se ne poklapaju',
                      });
                    } else {
                      this.setState({
                        passwordRepeat: e.target.value,
                        warrningMessage: null,
                      });
                    }
                  } else {
                    this.setState({
                      warrningMessage: 'Neispravan format šifre',
                    });
                    this.showNotifications();
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
            fizio
            categories
            comingHomeFunc={this.comingHomeFunc}
            comingHomeParams={this.state.comesHome}
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