import React from 'react';
import LoadingComponent from './LoadingComponent';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { blue800, white } from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import css from '../styles/styles.scss';
import TextEditor from '../Forms/TextEditor';
import Uppy from '../Uppy';
import RaisedButton from 'material-ui/RaisedButton';
import {
  validateStringNames,
  validateEmail,
  validatePhone,
  validateBirthPlace,
  validateUrl,
} from '../Forms/validationFuncs';
import logoBright from '../../../static/logoBright.png';

const axios = require('axios');

@withRouter
@graphql(gql`
  mutation updateOrCreateFisio(
    $email: String,
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
        email
        password
        firstName
        lastName
        facebookLink
        instagramLink
        cellPhone
        birthPlace
        birthDay
        hasCerificates
        about
        imageUrl
        fisioSkillsArr
    }
  }`,
{
  name: 'updateMe',
})
class EditFisio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userFisio: null,
            snackOpen: false,
            openDialog: false,
            phoneErr: false,
            loading: null,
            snackMessage: 'Greska!!',
        }
    }
    componentDidMount() {
        this.getUser();
    }
    getUser = async () => {
        if (window) {
            const isLogedIn = await window.localStorage.getItem('fbToken');
            if (isLogedIn) {
                const { accessToken } = JSON.parse(isLogedIn);
                if (accessToken) {
                    const { userFisio } = accessToken
                    this.setState({
                        userFisio,
                    });
                }
            }
        }
    }

    addNewUser = async () => {
      if (this.state.userFisio.firstName === '' || !validateStringNames(this.state.userFisio.firstName)) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Ime ne sme biti prazno i mora imati više od 2 karaktera',
        });
        return;
      }
      if (this.state.userFisio.lastName === '' || !validateStringNames(this.state.userFisio.lastName)) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Prezime ne sme biti prazno i mora imati više od 2 karaktera',
        });
        return;
      }
      if (this.state.userFisio.birthPlace === '') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Mesto rodjenja ne sme biti prazno!',
        });
        return;
      }
      if (!validateEmail(this.state.userFisio.email)) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Email format nije u redu',
        });
        return;
      }
      if (!validatePhone(this.state.userFisio.cellPhone) || this.state.userFisio.cellPhone === '+381') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Broj telefona nije u redu!',
        });
        return;
      }
      if (this.state.userFisio.birthDay === '') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Molimo popunite datum rodjenja. Hvala!',
        });
        return;
      }
      if (!/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(this.state.userFisio.facebookLink)) {
        this.setState({
          openDialog: true,
          facebookLink: 'https://facebook.com/',
          socialMessage: 'Facebook link nije u redu. Predlažemo da odete na svoj Facebook profil i kopirate link iz address bar-a. Ukoliko nemate Facebook profil ostavite ovo polje prazno. Hvala!'
        });
        return;
      }
      if (!/^(https?:\/\/)?((w{3}\.)?)instagram.com\/.*/i.test(this.state.userFisio.instagramLink)) {
        this.setState({
          openDialog: true,
          instagramLink: 'https://instagram.com/',
          socialMessage: 'Instagram link nije u redu. Predlažemo da odete na svoj Instagram profil i kopirate link iz address bar-a. Ukoliko nemate profil na Instagramu ostavite ovo polje prazno. Hvala!'
        });
        return;
      }
      if (this.state.userFisio.fisioSkillsArr.length < 1) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Morate izabrati barem jednu veštinu koju trenirate!',
        });
        return;
      }
      this.setState(() => {
        return {
          loading : true,
        };
      });
      const { file } = this.state;
      let uniqueNameForImg = '';
      let fileOk = false;
      if (file) {
        const cloudUrl = `https://api.cloudinary.com/v1_1/drama/upload`;
        const cloudPreset = `ioxmokvx`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudPreset);
        formData.append('options', { width: 320, height: 320, crop: 'limit', format: 'jpg' });
        const uploadNow = await axios({
          url: cloudUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: formData,
        });
        if (uploadNow.status === 200) {
          fileOk = true;
          uniqueNameForImg = uploadNow.data.secure_url;
        }
      }
      const mutation = await this.props.updateMe(
        {
          variables: {
            email: this.state.userFisio.email,
            firstName: this.state.userFisio.firstName,
            lastName: this.state.userFisio.lastName,
            facebookLink: this.state.userFisio.facebookLink,
            instagramLink: this.state.userFisio.instagramLink,
            cellPhone: this.state.userFisio.cellPhone.toString(),
            birthPlace: this.state.userFisio.birthPlace,
            birthDay: this.state.userFisio.birthDay.toString(),
            about: this.state.userFisio.about.toString(),
            imageUrl: fileOk ? `${uniqueNameForImg}` : this.state.userFisio.imageUrl,
            skillsArr: this.state.userFisio.skillArr,
            personClub: this.state.userFisio.personClub,
          },
        },
      );
      console.log("JALLOP MAMA ", mutation.data.updateOrCreateFisio);
      const userLogedIn = window.localStorage.getItem('fbToken');
      const parsedLogin = JSON.parse(userLogedIn);
      const updatedUser = {accessToken: {...parsedLogin.accessToken, userFisio: { ...mutation.data.updateOrCreateFisio }}}
      window.localStorage.setItem('fbToken', JSON.stringify(updatedUser));
      console.log("state ", this.state.userFisio);
      this.setState(() => {
        return {
          loading : false,
        };
      });
      this.props.history.push(`user-loged-in/${mutation.data.updateOrCreateFisio.id}`);
    }

    render() {
        console.log("STATE", this.state);
        const { userFisio, loading } = this.state;
        const actions = [
          <RaisedButton
            label="Ok"
            labelColor="#fff"
            labelStyle={{ fontWeight: '700' }}
            backgroundColor="#1da9ec"
            onClick={this.handleClose}
          />,
        ];
        if (!userFisio || loading) return <LoadingComponent />
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
                {
                    userFisio ?
                    <div className={css.registerFisio}>
                        <div className={css.registerFisioOne}>
                          <div className={css.inputWrapperForm}>
                            {/* <label className={css.labelsRegister}>First name</label> */}
                            <TextField
                              
                              floatingLabelText="Ime"
                              floatingLabelStyle={{ color: white }}
                              value={userFisio.firstName}
                              underlineFocusStyle={{ borderColor: blue800 }}
                              style={{ width: '100%', textTransform: 'capitalize' }}
                              className={css.biggerFont}
                              errorText={this.state.nameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                              onChange={(e, firstName) => {
                                  const { userFisio } = this.state;
                                  this.setState({
                                    userFisio: {
                                      ...userFisio,
                                      firstName: e.target.value,
                                    },
                                    instaErr: false,
                                    snackOpen: false,
                                  });
                              }}
                            />
                          </div>
                          <div className={css.inputWrapperForm}>
                            <TextField
                              value={userFisio.lastName}
                              floatingLabelText="Prezime"
                              floatingLabelStyle={{ color: white }}
                              underlineFocusStyle={{ borderColor: blue800 }}
                              className={css.biggerFont}
                              style={{ width: '100%', textTransform: 'capitalize' }}
                              errorText={this.state.lastNameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                              onChange={(e, lastName) => {
                                const { userFisio } = this.state;
                                  this.setState({
                                    userFisio: {
                                      ...userFisio,
                                      lastName: e.target.value,
                                    },
                                    instaErr: false,
                                    snackOpen: false,
                                  });
                              }}
                            />
                          </div>
                        </div>
                        <div className={css.registerFisioOne}>
                            <div className={css.inputWrapperForm}>
                              <TextField
                                value={userFisio.email}
                                hintStyle={{ color: blue800 }}
                                floatingLabelText="Email"
                                floatingLabelStyle={{ color: white }}
                                underlineFocusStyle={{ borderColor: blue800 }}
                                className={css.brightFont}
                                style={{ width: '100%' }}
                                errorText={this.state.emailErr ? 'Molimo unesite ispravan format email-a' : null}
                                onChange={(e, email) => {
                                  const { userFisio } = this.state;
                                    this.setState({
                                      userFisio: {
                                        ...userFisio,
                                        email: e.target.value,
                                      },
                                      instaErr: false,
                                      snackOpen: false,
                                    });
                                }}
                              />
                            </div>
                            <div className={css.inputWrapperForm}>
                              <DatePicker
                                floatingLabelText="Datum rodjenja"
                                defaultDate={new Date(userFisio.birthDay)}
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
                                value={userFisio.cellPhone}
                                floatingLabelText="Broj telefona"
                                floatingLabelStyle={{ color: white }}
                                underlineFocusStyle={{ borderColor: blue800 }}
                                style={{ width: '100%' }}
                                type="text"
                                className={css.brightFont}
                                errorText={this.state.phoneErr ? 'Molimo unesite ispravan broj telefona (npr. +381691112233)' : null}
                                onChange={(e, phone) => {
                                  const { userFisio } = this.state;
                                  this.setState({
                                    userFisio: {
                                      ...userFisio,
                                      cellPhone: e.target.value,
                                    },
                                    instaErr: false,
                                    snackOpen: false,
                                  });
                                }}
                              />
                            </div>
                            <div className={css.inputWrapperForm}>
                              <TextField
                                value={userFisio.birthPlace}
                                floatingLabelText="Mesto rodjenja"
                                floatingLabelStyle={{ color: white }}
                                underlineFocusStyle={{ borderColor: blue800 }}
                                style={{ width: '100%' }}
                                className={css.biggerFont}
                                errorText={this.state.birthErr ? 'Molimo unesti ispravno mesto rodjenja (npr. Beograd, Zrenjanin, Budva...)' : null}
                                onChange={(e, birthPlace) => {
                                  const { userFisio } = this.state;
                                  this.setState({
                                    userFisio: {
                                      ...userFisio,
                                      birthPlace: e.target.value,
                                    },
                                    instaErr: false,
                                    snackOpen: false,
                                  });
                                }}
                              />
                            </div>
                        </div>
                        <div className={css.registerFisioOne}>
                           <div className={css.inputWrapperForm}>
                             <TextField
                               value={userFisio.facebookLink}
                               floatingLabelText="Facebook Link"
                               floatingLabelStyle={{ color: white }}
                               underlineFocusStyle={{ borderColor: blue800 }}
                               style={{ width: '100%' }}
                               className={css.brightFont}
                               errorText={this.state.fbErr ? 'Format linka neispravan' : null}
                               onChange={(e, facebookLink) => {
                                 const { userFisio } = this.state;
                                  this.setState({
                                    userFisio: {
                                      ...userFisio,
                                      facebookLink: e.target.value,
                                    },
                                  instaErr: false,
                                  snackOpen: false,
                                  });
                               }}
                             />
                           </div>
                           <div className={css.inputWrapperForm}>
                             {/* <label className={css.labelsRegister}>Instagram Link</label> */}
                             <TextField
                               value={userFisio.instagramLink}
                               floatingLabelText="Instagram Link"
                               floatingLabelStyle={{ color: white }}
                               underlineFocusStyle={{ borderColor: blue800 }}
                               style={{ width: '100%' }}
                               className={css.brightFont}
                               errorText={this.state.instaErr ? 'Format linka neispravan' : null}
                               onChange={(e, instagramLink) => {
                                 const { userFisio } = this.state;
                                  this.setState({
                                    userFisio: {
                                      ...userFisio,
                                      instagramLink: e.target.value,
                                    },
                                    instaErr: false,
                                    snackOpen: false,
                                  });
                               }}
                             />
                           </div>
                        </div>
                        <div>
                            <div className={css.registerFisioOne}>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                  }}
                                >
                                  <h3
                                    style={{ color: '#fff' }}
                                  >
                                    Opis:
                                  </h3>
                                  {/* <TextField
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
                                  /> */}
                                  <TextEditor
                                    initVal={userFisio.about}
                                    getValue={value => {
                                      this.setState({
                                        userFisio: {
                                          ...userFisio,
                                          about: value,
                                        },
                                      instaErr: false,
                                      snackOpen: false,
                                      });
                                    }}
                                  />
                                </div>
                            </div>
                            <div className={css.registerFisioOne}>
                                <Uppy
                                    file={this.state.file}
                                    imageProp={userFisio.imageUrl}
                                    setRegister={injectFile => this.setState({ file: injectFile })}
                                />
                            </div>
                            <div
                                className={css.registerFisioOne}
                            >
                                <RaisedButton
                                    label="Sacuvajte"
                                    fullWidth
                                    labelColor="#fff"
                                    labelStyle={{ fontWeight: '700' }}
                                    backgroundColor="#1da9ec"
                                    onClick={() => {
                                      this.addNewUser();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                  
                    : null
                }
            </div>
        )
    }
}

export default EditFisio;