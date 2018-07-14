import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import Loading from 'react-loading-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { blue800, white } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
import logoBright from '../../../static/logoBright.png';
import SearchBox from '../searchBox';
import TextEditor from './TextEditor';

import {
  validateStringNames,
  validateEmail,
  validatePhone,
  validateBirthPlace,
  validateUrl,
} from './validationFuncs';


const axios = require('axios');

@withRouter
@graphql(gql`
  mutation updateOrCreateClub(
    $email: String,
    $password: String,
    $name: String,
    $address: String,
    $facebookLink: String,
    $instagramLink: String,
    $phone: String,
    $about: String,
    $profileImageUrl: String,
    $skillsArr: [Int],
    $webAddress: String
  ) {
    updateOrCreateClub(
      email: $email,
      password: $password,
      name: $name,
      address: $address,
      webAddress: $webAddress,
      facebookLink: $facebookLink,
      instagramLink: $instagramLink,
      phone: $phone,
      about: $about,
      profileImageUrl: $profileImageUrl,
      skillsArr: $skillsArr
    ) {
      id
    }
  }`, {
  name: 'registerNewClub',
})
class RegisterClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      address: '',
      webAddress: 'http://',
      about: '',
      aboutHtml: '',
      facebookLink: '',
      instagramLink: '',
      profileImageUrl: '',
      phone: '+381',
      file: null,
      skillArr: [],
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

  newClub = async () => {
    const { password, passwordRepeat } = this.state;
    if (this.state.name === '') {
      this.setState({
        snackOpen: true,
        snackMessage: 'Ime ne sme biti prazno i mora imati više od 2 karaktera',
      });
      return;
    }
    if (this.state.address === '') {
        this.setState({
          snackOpen: true,
          snackMessage: 'Adresa ne sme biti prazna, mora imati više od 2 karaktera',
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
    if (!/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(this.state.facebookLink)) {
      this.setState({
        openDialog: true,
        facebookLink: 'https://facebook.com/',
        socialMessage: 'Facebook link nije u redu. Predlažemo da odete na svoj Facebook profil i kopirate link iz address bar-a. Ukoliko nemate facebook profil ostavite ovo polje prazno. Hvala!'
      });
      return;
    }
    if (!/^(https?:\/\/)?((w{3}\.)?).*/i.test(this.state.webAddress)) {
        this.setState({
          openDialog: true,
          webAddress: 'http://fit-net.rs/',
          socialMessage: 'Link nije u redu. Ukoliko nemate web stranu kluba, ostavite ovo polje prazno. Hvala!'
        });
        return;
      }
    if (!/^(https?:\/\/)?((w{3}\.)?)instagram.com\/.*/i.test(this.state.instagramLink)) {
      this.setState({
        openDialog: true,
        instagramLink: 'https://instagram.com/',
        socialMessage: 'Instagram link nije u redu. Predlažemo da odete na svoj Instagram profil i kopirate link iz address bar-a. Hvala!'
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
      return;
    }
    if (password === passwordRepeat) {
      this.setState({
        loading: true,
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
      const mutation = await this.props.registerNewClub(
        {
          variables: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            facebookLink: this.state.facebookLink,
            instagramLink: this.state.instagramLink,
            phone: this.state.phone,
            about: this.state.aboutHtml,
            webAddress: this.state.webAddress,
            profileImageUrl: fileOk ? `${uniqueNameForImg}` : 'http://res.cloudinary.com/drama/image/upload/v1526508620/smiljkoHolder_ovuulk.png',
            skillsArr: this.state.skillArr,
          },
        },
      );
      if (mutation) {
        const { id } = mutation.data.updateOrCreateClub;
        this.props.history.push(`/work-times-club/${id}`);
      }
    } else {
      this.setState({
        snackOpen: true,
        snackMessage: 'Šifre se ne poklapaju!',
        passErr: true,
      });
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
        skillArr: [...skillArr, parseInt(skillId)],
        snackOpen: false,
      });
    }
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
              <TextField
                hintText="Unesite ime"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Ime"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                style={{ width: '100%', textTransform: 'capitalize' }}
                className={css.biggerFont}
                errorText={this.state.nameErr ? 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!' : null}
                onChange={(e, name) => {
                  if (validateStringNames(name)) {
                    this.setState({
                      warrningMessage: null,
                      snackOpen: false,
                      nameErr: false,
                      name,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                      nameErr: true,
                      warrningMessage: 'Ime mora imati više od 2 karakera i ne sme sadržati brojeve!',
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              {/* <label className={css.labelsRegister}>Last name</label> */}
              <TextField
                hintText="Unesite web adresu"
                hintStyle={{ color: blue800 }}
                floatingLabelText="Web adresa"
                floatingLabelStyle={{ color: white }}
                underlineFocusStyle={{ borderColor: blue800 }}
                className={css.brightFont}
                style={{ width: '100%', }}
                errorText={this.state.webAddressErr ? 'Morate uneti ispravan link' : null}
                onChange={(e, webAddress) => {
                    if (validateUrl(webAddress)) {
                    this.setState({
                      snackOpen: false,
                      warrningMessage: null,
                      webAddress,
                      webAddress: null,
                    });
                  } else {
                    this.setState({
                      snackOpen: false,
                      warrningMessage: 'Neispravan format linka!',
                      webAddress: true,
                    });
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
                className={css.brightFont}
                errorText={this.state.emailErr ? 'Molimo unesite ispravan format email-a' : null}
                onChange={(e, email) => {
                  if (validateEmail(email)) {
                    this.setState({
                      warrningMessage: null,
                      emailErr: false,
                      email,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      emailErr: true,
                      warrningMessage: 'Neispravan format email adrese!',
                      snackOpen: false,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
              <TextField
                  hintText="Unesite broj telefona"
                  hintStyle={{ color: blue800 }}
                  floatingLabelText="Broj telefona"
                  floatingLabelStyle={{ color: white }}
                  underlineFocusStyle={{ borderColor: blue800 }}
                  style={{ width: '100%' }}
                  type="text"
                  className={css.brightFont}
                  errorText={this.state.phoneErr ? 'Molimo unesite ispravan broj telefona (npr. +381691112233)' : null}
                  value={this.state.phone}
                  onChange={(e, phone) => {
                    if (validatePhone(phone)) {
                      this.setState({
                        snackOpen: false,
                        warrningMessage: null,
                        phoneErr: false,
                        phone,
                      });
                    } else {
                      this.setState({
                        snackOpen: false,
                        warrningMessage: true,
                        phoneErr: true,
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
                      warrningMessage: null,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      warrningMessage: true,
                      fbErr: true,
                      snackOpen: false,
                    });
                  }
                }}
              />
            </div>
            <div className={css.inputWrapperForm}>
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
                      warrningMessage: false,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      warrningMessage: true,
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
              {/* <label className={css.labelsRegister}>Password</label> */}
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
                  if (password === this.state.passwordRepeat) {
                    this.setState({
                      password,
                      passErr: false,
                      snackOpen: false,
                    });
                  } else {
                    this.setState({
                      password,
                      passErr: true,
                      snackOpen: false,
                    });
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
                className={css.brightFont}
                errorText={this.state.passErr ? 'Šifre se ne poklapaju!' : null}
                onChange={(e, passwordRepeat) => {
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
                }}
              />
            </div>
          </div>
          <div className={css.registerFisioOne}>
            <div className={css.inputWrapperForm}>
              <TextField
                  hintText="Unesite adresu"
                  hintStyle={{ color: blue800 }}
                  floatingLabelText="Unesite adresu"
                  floatingLabelStyle={{ color: white }}
                  underlineFocusStyle={{ borderColor: blue800 }}
                  style={{ width: '100%' }}
                  type="text"
                  className={css.brightFont}
                  errorText={this.state.addressErr ? 'Adresa mora imati više karaktera' : null}
                  onChange={(e, address) => {
                    if (address.length > 2) {
                        this.setState({
                          warrningMessage: null,
                          snackOpen: false,
                          addressErr: false,
                          address
                        });
                      } else {
                        this.setState({
                          snackOpen: false,
                          addressErr: true,
                          warrningMessage: 'Adresa mora imati više od 2 karakera',
                        });
                      }
                  }}
                />
            </div>
            <div className={css.inputWrapperForm}>
            </div>
          </div> 
         
        </div>
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
            <h3
              style={{ color: '#fff' }}
            >
              Opis:
            </h3>
            <TextEditor
              getValue={value => {
                this.setState({
                  aboutHtml: value,
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
        <div className={css.registerFisioOne} style={{ justifyContent: 'center', marginBottom: '20px' }}>
          <RaisedButton
            label="Registrujte se"
            fullWidth
            labelColor="#fff"
            labelStyle={{ fontWeight: '700' }}
            backgroundColor="#1da9ec"
            onClick={() => {
              this.newClub();
            }} />
        </div>
      </div>
    );
  }
}
export default RegisterClub;
