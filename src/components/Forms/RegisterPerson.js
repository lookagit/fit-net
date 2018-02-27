import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';

@graphql(gql`
  mutation updateOrCreateUser($email: String, $password: String, $firstName: String, $lastName: String, $facebookLink: String, $instagramLink: String, $cellPhone: String, $birthPlace: String, $birthDay: String, $hasCertificates: Boolean, $about: String, $imageUrl: String) {
    updateOrCreateUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, facebookLink: $facebookLink, instagramLink: $instagramLink, cellPhone: $cellPhone, birthPlace: $birthPlace, birthDay: $birthDay, hasCertificates: $hasCertificates, about: $about, imageUrl: $imageUrl) {
      id
    }
  }`,
  {
    name: 'registerMe',
  }
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
      date: '',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '',
      hasCertificates: false,
      imgUrl: 'https://google.com'
    }
  }
  newUser = async () => {
    console.log('kreni',this.props);
    let mutation = await this.props.registerMe(
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
          hasCertificates: this.state.hasCertificates,
          about: this.state.about,
          imageUrl: this.state.imgUrl
        }
      }
    )
    console.log("resp:",mutation);
    if (mutation) {
      console.log('prosaooo', mutation);
    } else {
      console.log('prsoo', mutation);
    }
  }
  getValue = (field, e) => {
    switch(field) {
      case 'firstName':
        this.setState({
          firstName: e.target.value,
        });
        break;
      case 'lastName':
        this.setState({
          lastName: e.target.value,
        });
        break;
      case 'email':
        this.setState({
          email: e.target.value,
        });
        break;
      case 'password':
        this.setState({
          password: e.target.value,
        });
        break;
      case 'facebookLink':
        this.setState({
          facebookLink: e.target.value,
        });
       break;
      case 'instagramLink':
        this.setState({
          instagramLink: e.target.value,
        });
       break;
      case 'birthPlace':
       this.setState({
         birthPlace: e.target.value,
       });
        break;
      case 'phone': 
        this.setState({
          phone: e.target.value,
        });
        break;
      case 'date': 
        this.setState({
          date: e.target.value,
        });
        break;
      case 'about':
        this.setState({
          about: e.target.value,
        });
    }
  }
  render() {
    console.log(this.props)
    return( 
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>First name</label>
            <input placeholder="First name" type="text"
              onChange={(e) => {
                this.getValue('firstName', e);
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Last name</label>
            <input placeholder="Last name" type="text"
              onChange={(e) => {
                this.getValue('lastName', e)
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Email</label>
            <input placeholder="Email" type="text"
              onChange={(e) => {
                this.getValue('email',e)
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>Password</label>
            <input placeholder="Password" type="text"
              onChange={(e) => {
                this.getValue('password',e)
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Phone</label>
            <input placeholder="Phone" type="text"
              onKeyPress={(e) => {
                this.getValue('phone',e)
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Birtday Place</label>
            <input placeholder="Birtday Place" type="text"
              onChange={(e) => {
                this.getValue('birthPlace',e)
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>Birtday Date</label>
            <input placeholder="Birthday Date" type="text"
              onChange={(e) => {
                this.getValue('date',e)
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Facebook Link</label>
            <input placeholder="Facebook Link" type="text"
              onChange={(e) => {
                this.getValue('facebookLink',e)
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Instagram Link</label>
            <input placeholder="Instagram Link" type="text"
              onChange={(e) => {
                this.getValue('instagramLink',e)
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
            <label className={css.labelsRegister}>About</label>
            <input placeholder="About" type="text"
              onChange={(e) => {
                this.getValue('about',e)
              }}
            />
          </div>
          <Uppy />
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
          <button onClick={() => {
            console.log('state i props na register me', this.state, this.props)
            this.newUser();
          }}
          >REGISTER ME</button>
        </div>
      </div>
    );
  }
} 
export default RegisterPerson;