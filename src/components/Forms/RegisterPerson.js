import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';

@graphql(
  gql`mutation updateOrCreateUser($email: String, $password: String, $firstName: String, $lastName: String, $facebookLink: String, $instagramLink: String, $cellPhone: String, $birthPlace: String, $birthDay: String, $hasCertificates: Boolean, $about: String, $imageUrl: String, $skillsArr: [Int]) {
    updateOrCreateUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, facebookLink: $facebookLink, instagramLink: $instagramLink, cellPhone: $cellPhone, birthPlace: $birthPlace, birthDay: $birthDay, hasCertificates: $hasCertificates, about: $about, imageUrl: $imageUrl, skillsArr: $skillsArr) {
      PersonCl {
        id
      }
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
      birtdayPlace: '',
      date: '',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '',
      hasCertificaters: false,
      imgUrl: '',
      skillArr: [1, 2, 3],
    }
  }
  registerMe = async () => {
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
          birtdayPlace: this.state.birtdayPlace,
          birthDay: this.state.date,
          hasCertificaters: this.state.hasCertificaters,
          about: this.state.about,
          imageUrl: this.state.imgUrl,
          skillArr: this.state.skillArr,
        },
      },
    );
    if (mutation) {
      console.log('prosaooo', mutation);
    } else {
      console.log('prsoo', mutation);
    }
  }
  render() {
    console.log('ovo je props', this.props)
    return( 
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>First name</label>
            <input placeholder="First name" type="text"
              onKeyPress={(e) => {
                this.setState({
                  firstName: e.target.value,
                })
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Last name</label>
            <input placeholder="Last name" type="text"
              onKeyPress={(e) => {
                this.setState({
                  lastName: e.target.value,
                })
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Email</label>
            <input placeholder="Email" type="text"
              onKeyPress={(e) => {
                this.setState({
                  email: e.target.value,
                })
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>Password</label>
            <input placeholder="Password" type="text"
              onKeyPress={(e) => {
                this.setState({
                  password: e.target.value,
                })
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Phone</label>
            <input placeholder="Phone" type="text"
              onKeyPress={(e) => {
                this.setState({
                  phone: e.target.value,
                })
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Birtday Place</label>
            <input placeholder="Birtday Place" type="text"
              onKeyPress={(e) => {
                this.setState({
                  birtdayPlace: e.target.value,
                })
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>Birtday Date</label>
            <input placeholder="Birthday Date" type="text"
              onKeyPress={(e) => {
                this.setState({
                  date: e.target.value,
                })
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Facebook Link</label>
            <input placeholder="Facebook Link" type="text"
              onKeyPress={(e) => {
                this.setState({
                  facebookLink: e.target.value,
                })
              }}
            />
          </div>
          <div>
            <label className={css.labelsRegister}>Instagram Link</label>
            <input placeholder="Instagram Link" type="text"
              onKeyPress={(e) => {
                this.setState({
                  instagramLink: e.target.value,
                })
              }}
            />
          </div>
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>
            <label className={css.labelsRegister}>About</label>
            <input placeholder="About" type="text"
              onKeyPress={(e) => {
                this.setState({
                  about: e.target.value,
                })
              }}
            />
          </div>
          <Uppy />
        </div>
        <div style={{margin: '0 auto', width: '50%', display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
          <button onClick={() => {
            this.registerMe();
          }}
          >REGISTER ME</button>
        </div>
      </div>
    );
  }
} 
export default RegisterPerson;