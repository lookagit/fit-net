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

@withRouter
@graphql(gql`
  mutation updateOrCreateUser(
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
    $skillsArr: [Int]
  ) {
    updateOrCreateUser(
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
      skillsArr: $skillsArr
    ) {
      id
    }
  }`,
{
  name: 'updateMe',
})
class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPerson: null,
            snackOpen: false,
            openDialog: false,
            phoneErr: false,
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
                    const { userPerson } = accessToken
                    this.setState({
                        userPerson,
                    });
                }
            }
        }
    }

    addNewUser = async () => {
      if (this.state.userPerson.firstName === '' || !validateStringNames(this.state.userPerson.firstName)) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Ime ne sme biti prazno i mora imati više od 2 karaktera',
        });
        return;
      }
      if (this.state.userPerson.lastName === '' || !validateStringNames(this.state.userPerson.lastName)) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Prezime ne sme biti prazno i mora imati više od 2 karaktera',
        });
        return;
      }
      if (this.state.userPerson.birthPlace === '') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Mesto rodjenja ne sme biti prazno!',
        });
        return;
      }
      if (!validateEmail(this.state.userPerson.email)) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Email format nije u redu',
        });
        return;
      }
      if (!validatePhone(this.state.userPerson.cellPhone) || this.state.userPerson.cellPhone === '+381') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Broj telefona nije u redu!',
        });
        return;
      }
      if (this.state.userPerson.birthDay === '') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Molimo popunite datum rodjenja. Hvala!',
        });
        return;
      }
      if (!/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(this.state.userPerson.facebookLink)) {
        this.setState({
          openDialog: true,
          facebookLink: 'https://facebook.com/',
          socialMessage: 'Facebook link nije u redu. Predlažemo da odete na svoj Facebook profil i kopirate link iz address bar-a. Ukoliko nemate Facebook profil ostavite ovo polje prazno. Hvala!'
        });
        return;
      }
      if (!/^(https?:\/\/)?((w{3}\.)?)instagram.com\/.*/i.test(this.state.userPerson.instagramLink)) {
        this.setState({
          openDialog: true,
          instagramLink: 'https://instagram.com/',
          socialMessage: 'Instagram link nije u redu. Predlažemo da odete na svoj Instagram profil i kopirate link iz address bar-a. Ukoliko nemate profil na Instagramu ostavite ovo polje prazno. Hvala!'
        });
        return;
      }
      if (this.state.userPerson.skillsArr.length < 1) {
        this.setState({
          snackOpen: true,
          snackMessage: 'Morate izabrati barem jednu veštinu koju trenirate!',
        });
        return;
      }
      const mutation = await this.props.updateMe(
        {
          variables: {
            email: this.state.userPerson.email,
            firstName: this.state.userPerson.firstName,
            lastName: this.state.userPerson.lastName,
            facebookLink: this.state.userPerson.facebookLink,
            instagramLink: this.state.userPerson.instagramLink,
            cellPhone: this.state.userPerson.cellPhone,
            birthPlace: this.state.userPerson.birthPlace,
            birthDay: this.state.userPerson.date,
            about: this.state.userPerson.about,
            imageUrl: this.state.userPerson.imageUrl,
            skillsArr: this.state.userPerson.skillArr,
          },
        },
      );
      console.log("JA SAM MUTATION ", mutation);
    }

    render() {
        console.log("STATE", this.state);
        const { userPerson } = this.state;
        const actions = [
          <RaisedButton
            label="Ok"
            labelColor="#fff"
            labelStyle={{ fontWeight: '700' }}
            backgroundColor="#1da9ec"
            onClick={this.handleClose}
          />,
        ];
        if (!userPerson) return <LoadingComponent />
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
                    userPerson ?
                    <div className={css.registerFisio}>
                        <div className={css.registerFisioOne}>
                          <div className={css.inputWrapperForm}>
                            {/* <label className={css.labelsRegister}>First name</label> */}
                            <TextField
                              
                              floatingLabelText="Ime"
                              floatingLabelStyle={{ color: white }}
                              value={userPerson.firstName}
                              underlineFocusStyle={{ borderColor: blue800 }}
                              style={{ width: '100%', textTransform: 'capitalize' }}
                              className={css.biggerFont}
                              errorText={this.state.nameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                              onChange={(e, firstName) => {
                                console.log("JA SAM FIRST NAME ", firstName);
                                if (validateStringNames(firstName)) {
                                  console.log("JA SAM FIRST NAME idddddd", firstName);
                                  const { userPerson } = this.state;
                                  this.setState({
                                    snackOpen: false,
                                    nameErr: false,
                                    userPerson: {
                                      ...userPerson,
                                      firstName: e.target.value,
                                    },
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
                              value={userPerson.lastName}
                              floatingLabelText="Prezime"
                              floatingLabelStyle={{ color: white }}
                              underlineFocusStyle={{ borderColor: blue800 }}
                              className={css.biggerFont}
                              style={{ width: '100%', textTransform: 'capitalize' }}
                              errorText={this.state.lastNameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                              onChange={(e, lastName) => {
                                const { userPerson } = this.state;
                                if (validateStringNames(lastName)) {
                                  this.setState({
                                    snackOpen: false,
                                    lastNameErr: null,
                                    userPerson: {
                                      ...userPerson,
                                      lastName: e.target.value,
                                    },
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
                                value={userPerson.email}
                                hintStyle={{ color: blue800 }}
                                floatingLabelText="Email"
                                floatingLabelStyle={{ color: white }}
                                underlineFocusStyle={{ borderColor: blue800 }}
                                className={css.brightFont}
                                style={{ width: '100%' }}
                                errorText={this.state.emailErr ? 'Molimo unesite ispravan format email-a' : null}
                                onChange={(e, email) => {
                                  const { userPerson } = this.state;
                                  if (validateEmail(email)) {
                                    this.setState({
                                      emailErr: false,
                                      snackOpen: false,
                                      userPerson: {
                                        ...userPerson,
                                        email: e.target.value,
                                      },
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
                                defaultDate={new Date(userPerson.birthDay)}
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
                                value={userPerson.cellPhone}
                                floatingLabelText="Broj telefona"
                                floatingLabelStyle={{ color: white }}
                                underlineFocusStyle={{ borderColor: blue800 }}
                                style={{ width: '100%' }}
                                type="text"
                                className={css.brightFont}
                                errorText={this.state.phoneErr ? 'Molimo unesite ispravan broj telefona (npr. +381691112233)' : null}
                                onChange={(e, phone) => {
                                  const { userPerson } = this.state;
                                  if (validatePhone(phone)) {
                                    this.setState({
                                      snackOpen: false,
                                      phoneErr: false,
                                      userPerson: {
                                        ...userPerson,
                                        cellPhone: e.target.value,
                                      },
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
                                value={userPerson.birthPlace}
                                floatingLabelText="Mesto rodjenja"
                                floatingLabelStyle={{ color: white }}
                                underlineFocusStyle={{ borderColor: blue800 }}
                                style={{ width: '100%' }}
                                className={css.biggerFont}
                                errorText={this.state.birthErr ? 'Molimo unesti ispravno mesto rodjenja (npr. Beograd, Zrenjanin, Budva...)' : null}
                                onChange={(e, birthPlace) => {
                                  const { userPerson } = this.state;
                                  if (validateBirthPlace(birthPlace)) {
                                    this.setState({
                                      userPerson: {
                                        ...userPerson,
                                        birthPlace: e.target.value,
                                      },
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
                               value={userPerson.facebookLink}
                               floatingLabelText="Facebook Link"
                               floatingLabelStyle={{ color: white }}
                               underlineFocusStyle={{ borderColor: blue800 }}
                               style={{ width: '100%' }}
                               className={css.brightFont}
                               errorText={this.state.fbErr ? 'Format linka neispravan' : null}
                               onChange={(e, facebookLink) => {
                                 const { userPerson } = this.state;
                                 if (validateUrl(facebookLink)) {
                                   this.setState({
                                    userPerson: {
                                      ...userPerson,
                                      facebookLink: e.target.value,
                                    },
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
                               value={userPerson.instagramLink}
                               floatingLabelText="Instagram Link"
                               floatingLabelStyle={{ color: white }}
                               underlineFocusStyle={{ borderColor: blue800 }}
                               style={{ width: '100%' }}
                               className={css.brightFont}
                               errorText={this.state.instaErr ? 'Format linka neispravan' : null}
                               onChange={(e, instagramLink) => {
                                 const { userPerson } = this.state;
                                 if (validateUrl(instagramLink)) {
                                   this.setState({
                                    userPerson: {
                                      ...userPerson,
                                      instagramLink: e.target.value,
                                    },
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
                                    initVal={userPerson.about}
                                    getValue={value => {
                                      this.setState({
                                        userPerson: {
                                          ...userPerson,
                                          about: value,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                            </div>
                            <div className={css.registerFisioOne}>
                                <Uppy
                                    imageProp={userPerson.imageUrl}
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

export default EditUser;