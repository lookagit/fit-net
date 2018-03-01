import React from 'react';
import { graphql } from 'react-apollo';
import faker from 'faker';
import gql from 'graphql-tag';
import Uppy from '../Uppy';
import css from '../styles/styles.scss';
import RegisterInput from './RegisterInput';

const axios = require('axios');

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
    $imageUrl: String
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
      imageUrl: $imageUrl
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
      date: '',
      about: '',
      facebookLink: '',
      instagramLink: '',
      phone: '',
      hasCerificates: false,
      file: null,
      imgUrl: 'https://google.com',
    }
  }

  getValue = (field, e) => {
    switch(field) {
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
  newUser = async () => {
    let url = '';
    const { file } = this.state;
    const fakerUuid = faker.random.uuid();
    const fileType = file.type.split('/').pop();
    const uniqueNameForImg = `${fakerUuid}.${fileType}`;
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
        console.log("JA SAM NA SERVERU BATICEEEEE 0", putOnServer);
      } else {
        console.log("IZDUVASMO GA BATICE ", putOnServer);
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
          hasCertificates: this.state.hasCertificates,
          about: this.state.about,
          imageUrl: `https://fitnetbucket.s3.eu-west-3.amazonaws.com/${uniqueNameForImg}`,
        },
      },
    );
    console.log("resp:",mutation);
    if (mutation) {
      console.log('prosaooo', mutation);
    } else {
      console.log('prsoo', mutation);
    }
  }
  render() {
    console.log(this.state);
    return( 
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        <div style={{margin: '0 auto', width: '50%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <div>
            <label className={css.labelsRegister}>First name</label>
            <RegisterInput
              placeholder="First name"
              type="text"
              updateFunc={(e) => this.setState({firstName: e.target.value})}
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
            onChange={(e) => this.getValue('about',e)}
          />
          </div>
          <Uppy setRegister={injectFile => this.setState({file: injectFile })} />
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